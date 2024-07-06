'use client';
import DataTableCustom from '@/components/datatables/data-table';
import IconBell from '@/components/icon/icon-bell';
import { FaUserCheck, FaUserEdit, FaUserTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { managementAPI } from '@/config/axios/axios';
import { useQuery } from '@tanstack/react-query';
import { set } from 'lodash';
import { ChevronRight } from 'lucide-react';
import { DataTableColumn } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/components/layouts/loading';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Swal from 'sweetalert2';
import HeaderOfTable from '@/components/datatables/headerOfTable';
import { RiUserAddLine } from 'react-icons/ri';

// const formatDate = (date: any) => {
//     if (date) {
//         const dt = new Date(date);
//         const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
//         const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
//         return day + '/' + month + '/' + dt.getFullYear();
//     }
//     return '';
// };

const Users = () => {
    const [columns, setColumns] = useState<DataTableColumn<any>[]>([]);
    const [search, setSearch] = useState('');

    const { data, error, isLoading, dataUpdatedAt } = useQuery({
        queryKey: ['users'],
        queryFn: managementAPI.getUsers,
    });
    console.log('dataUpdatedAt', dataUpdatedAt);

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
                { accessor: 'userName', title: 'Username', sortable: true },
                { accessor: 'email', title: 'Email', sortable: true },
                { accessor: 'phone', title: 'Phone', sortable: true },
                { accessor: 'address', title: 'Address', sortable: true },
                { accessor: 'roleName', title: 'Role Name', sortable: true },
                {
                    accessor: 'status',
                    title: 'Status',
                    sortable: true,
                    render: (value) => {
                        return (
                            <Badge variant={'outline'} className={cn('rounded', { 'bg-red-400 text-white': value.status !== 'Active', 'bg-orange-500 text-white': value.status === 'Active' })}>
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
                                    <FaUserEdit className="h-4 w-4" />
                                </Button>
                                {value.status === 'Active' && (
                                    <Button variant="outline" className="bg-red-500 text-white" size="sm" onClick={() => showAlert(value.id, 'Deactive', value.userName)}>
                                        <FaUserTimes className="h-4 w-4" />
                                    </Button>
                                )}
                                {value.status !== 'Active' && (
                                    <Button variant="outline" className="bg-orange-300 text-white" size="sm">
                                        <FaUserCheck className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        );
                    },
                },
            ];
            setColumns(collumnsConfig);
        }
    }, [data, error]);

    if (isLoading) {
        return (
            <div>
                <Loading></Loading>
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
                    <div className="ltr:mr-auto rtl:ml-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex-1 md:flex-auto">
                            <Button variant={'outline'}>
                                <RiUserAddLine className="mr-2 h-4 w-4" /> Add new user
                            </Button>
                        </div>
                    </div>
                </div>
                <DataTableCustom rowData={data?.data.result.users} columns={columns} search={search} setSearch={setSearch} />
            </div>
        </div>
    );
};

export default Users;
