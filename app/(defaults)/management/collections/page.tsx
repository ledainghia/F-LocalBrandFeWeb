'use client';
import DataTableCustom from '@/components/datatables/data-table';
import HeaderOfTable from '@/components/datatables/headerOfTable';
import IconBell from '@/components/icon/icon-bell';
import Loading from '@/components/layouts/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { managementAPI } from '@/config/axios/axios';
import { cn } from '@/lib/utils';
import { PopoverClose } from '@radix-ui/react-popover';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { set } from 'lodash';
import { DataTableColumn } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { FaUserCheck, FaUserEdit, FaUserTimes } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';
import { RiDeleteBin5Fill, RiUserAddLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Collections = () => {
    const [columns, setColumns] = useState<DataTableColumn<any>[]>([]);
    const [search, setSearch] = useState('');
    const [collectionName, setCollectionName] = useState('' as string);
    const [campaignId, setCampaignId] = useState('' as string);

    const [isAsc, setIsAsc] = useState('true' as string);
    const [filter, setFilter] = useState('' as string);
    const [rowData, setRowData] = useState([] as any[]);
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['collections'],
        queryFn: () => managementAPI.getCollections(filter),
    });

    const showAlert = async (userID: string, action: string, userName: string) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-secondary',
                cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                popup: 'sweet-alerts',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: `You want to ${action} ${userName} with ${userID}!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `Yes, ${action} it!`,
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
                padding: '2em',
            })
            .then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', 'No change', 'info');
                }
            });
    };

    useEffect(() => {
        if (error || data?.data.success === false) {
            toast.error('Error fetching data users');
        } else {
            const collumnsConfig: DataTableColumn<any>[] = [
                { accessor: 'id', title: 'ID', sortable: true },
                { accessor: 'collectionName', title: 'Collection Name', sortable: true },

                {
                    accessor: 'status',
                    title: 'Status',
                    sortable: true,
                    render: (value) => {
                        return (
                            <Badge variant={'outline'} className={cn('rounded', { 'bg-red-400 text-white': value.status !== 'Active' })}>
                                {value.status}
                            </Badge>
                        );
                    },
                },
                {
                    accessor: 'action',
                    title: '',
                    sortable: false,
                    render: (value) => {
                        return (
                            <div className="space-x-2">
                                <Button variant="outline" size="sm">
                                    <MdLibraryAdd className="h-4 w-4" />
                                </Button>
                                {value.status === 'Active' && (
                                    <Button variant="outline" size="sm" onClick={() => showAlert(value.id, 'Deactive', value.userName)}>
                                        <RiDeleteBin5Fill className="h-4 w-4" />
                                    </Button>
                                )}
                                {value.status !== 'Active' && (
                                    <Button variant="outline" size="sm">
                                        <RiDeleteBin5Fill className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        );
                    },
                },
            ];
            setColumns(collumnsConfig);
            setRowData(data?.data.result.collections || []);
        }
    }, [data]);

    const handleApplyFilter = () => {
        const filter = `collectionName=${collectionName}&campaignId=${campaignId}&isAsc=${isAsc}`;
        setFilter(filter);
    };

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['collections'] });
    }, [filter]);

    if (isLoading) {
        return (
            <div className="mt-52 flex h-full w-full justify-center align-middle">
                <span className="m-auto mb-10 inline-block h-14 w-14 animate-[spin_2s_linear_infinite] rounded-full border-8 border-[#f1f2f3] border-l-primary border-r-primary align-middle"></span>
            </div>
        );
    }

    return (
        <div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div>
                <span className="ltr:mr-3 rtl:ml-3">a</span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline" rel="noreferrer">
                    https://www.npmjs.com/package/mantine-datatable
                </a>
            </div>
            <div className="panel mt-6">
                <div className="mb-4.5 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="flex items-center gap-5 ltr:mr-auto rtl:ml-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">Custom filter</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-white">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-bold leading-none">Filter</h4>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="collectionName">Collection Name</Label>
                                            <Input
                                                id="collectionName"
                                                defaultValue={collectionName}
                                                onChange={(e) => {
                                                    setCollectionName(e.target.value);
                                                }}
                                                placeholder=""
                                                className="col-span-2 h-8"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="campaignID">Compaign ID</Label>
                                            <Input
                                                id="campaignID"
                                                defaultValue={campaignId}
                                                onChange={(e) => {
                                                    setCampaignId(e.target.value);
                                                }}
                                                className="col-span-2 h-8"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="isAsc">Is Ascending</Label>
                                            <Select value={isAsc} onValueChange={setIsAsc}>
                                                <SelectTrigger className="col-span-2 h-8">
                                                    <SelectValue placeholder="Is Ascending?" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectGroup>
                                                        <SelectLabel>TRUE / FALSE</SelectLabel>
                                                        <SelectItem value="true">TRUE</SelectItem>
                                                        <SelectItem value="false">FALSE</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <PopoverClose className="mt-4 w-full">
                                    <div className="flex w-full space-x-2">
                                        <Button
                                            variant={'outline'}
                                            className="w-full"
                                            onClick={() => {
                                                setCampaignId('');
                                                setCollectionName('');
                                                setIsAsc('');
                                                setFilter('');
                                            }}
                                        >
                                            Reset filter
                                        </Button>
                                        <Button className="w-full text-white" onClick={handleApplyFilter}>
                                            {' '}
                                            Apply this filter
                                        </Button>
                                    </div>
                                </PopoverClose>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex-1 md:flex-auto">
                            <Button variant={'outline'}>
                                <RiUserAddLine className="mr-2 h-4 w-4" /> Add new collection
                            </Button>
                        </div>
                    </div>
                </div>
                <DataTableCustom rowData={rowData} columns={columns} search={search} setSearch={setSearch} />
            </div>
        </div>
    );
};

export default Collections;
