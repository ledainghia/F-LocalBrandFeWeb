'use client';
import DataTableCustom from '@/components/datatables/data-table';
import HeaderOfTable from '@/components/datatables/headerOfTable';
import IconBell from '@/components/icon/icon-bell';
import Loading from '@/components/layouts/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { managementAPI } from '@/config/axios/axios';
import { cn } from '@/lib/utils';
import { s } from '@fullcalendar/core/internal-common';
import { PopoverClose } from '@radix-ui/react-popover';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { set } from 'lodash';
import { DataTableColumn } from 'mantine-datatable';
import Image from 'next/image';
import { ChangeEvent, Key, useEffect, useState } from 'react';
import { FaEdit, FaUserCheck, FaUserEdit, FaUserTimes } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';
import { RiDeleteBin5Fill, RiDeviceRecoverFill, RiUserAddLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { GoKebabHorizontal } from 'react-icons/go';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { AiOutlineProduct } from 'react-icons/ai';
import { ProductSize } from '@/datatype/productType';
import FormWizard from 'react-form-wizard-component';

import { IoColorPaletteOutline, IoResizeSharp } from 'react-icons/io5';
import { IoIosAddCircleOutline } from 'react-icons/io';
import SizeColorComponent from './SizeColorComponent';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
type Product = {
    id: string;
    size: number;
    productName: string;
    gender: string;
    description: string;
    price: number;
    status: string;
    imageUrl: string;
    campaign: {
        id: string;
        campaignName: string;
    };
    stockQuantity: number;
    category: {
        id: string;
        categoryName: string;
    };
    color: string;
    createDate: Date;
};

const Categories = () => {
    const [search, setSearch] = useState('');
    const [categoryName, setCategoryName] = useState('' as string);

    const [status, setStatus] = useState('' as string);

    const [description, setDescription] = useState<string>('');

    const [products, setProducts] = useState<Product[] | null>(null);

    const [isAsc, setIsAsc] = useState('TRUE' as string);
    const [filter, setFilter] = useState('' as string);

    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => managementAPI.getProducts(filter),
    });

    useEffect(() => {
        if (error || data?.data.success === false) {
            toast.error('Error fetching data users');
        } else {
            setProducts(data?.data?.result?.products);
        }
    }, [data]);

    const handleApplyFilter = () => {
        const filter = `CategoryName=${categoryName}&Description=${description}&Status=${status}`;
        setFilter(filter);
    };

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
    }, [filter]);

    if (isLoading) {
        return (
            <div className="mt-52 flex h-full w-full justify-center align-middle">
                <span className="m-auto mb-10 inline-block h-14 w-14 animate-[spin_2s_linear_infinite] rounded-full border-8 border-[#f1f2f3] border-l-primary border-r-primary align-middle"></span>
            </div>
        );
    }

    return (
        <>
            <div className="panel">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Management</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Products list</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="panel mt-6 ">
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
                                            <Label htmlFor="categoryName">Category Name</Label>
                                            <Input
                                                id="collectionName"
                                                defaultValue={categoryName}
                                                onChange={(e) => {
                                                    setCategoryName(e.target.value);
                                                }}
                                                placeholder=""
                                                className="col-span-2 h-8"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="Description">Description</Label>
                                            <Input
                                                id="Description"
                                                defaultValue={description}
                                                onChange={(e) => {
                                                    setDescription(e.target.value);
                                                }}
                                                className="col-span-2 h-8"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="status">Status</Label>
                                            <Select value={status} onValueChange={setStatus}>
                                                <SelectTrigger className="col-span-2 h-8">
                                                    <SelectValue placeholder="Is Active" />
                                                </SelectTrigger>
                                                <SelectContent id="status" className="bg-white">
                                                    <SelectGroup>
                                                        <SelectLabel>Active / Inactive</SelectLabel>
                                                        <SelectItem value="Active">Active</SelectItem>
                                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
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
                                                setCategoryName('');
                                                setDescription('');
                                                setStatus('');
                                                setIsAsc('');
                                                setFilter('');
                                            }}
                                        >
                                            Reset filter
                                        </Button>
                                        <Button className="w-full text-white" onClick={handleApplyFilter}>
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
                                <AiOutlineProduct className="mr-2 h-4 w-4" /> <Link href="/management/products/addNewProduct">Add new product</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Card className="col-span-12 rounded-t-lg lg:col-span-6 xl:col-span-4 2xl:col-span-3" key={product.id}>
                                <CardHeader className="rounded-t-lg p-0 pb-5">
                                    <div className="relative w-full">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <GoKebabHorizontal className="absolute right-4 top-2 h-6 w-6 text-white" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                                <DropdownMenuItem>Team</DropdownMenuItem>
                                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Badge variant={product.status === 'Active' ? 'default' : 'destructive'} className={`absolute left-2 top-2 rounded-md`}>
                                            {product.status}
                                        </Badge>
                                        <img alt={product.productName} className="h-[180px] w-full rounded-t-lg object-cover " src={product.imageUrl} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col">
                                        <div className="flex gap-2">
                                            <CardTitle>{product.productName}</CardTitle>
                                        </div>
                                        <CardDescription className="mt-2">{product.description}</CardDescription>
                                        <Separator className="mt-2" />
                                        <div className="mt-4 grid grid-cols-4 space-x-3">
                                            <div className="col-span-2">
                                                <p>ID:</p>
                                                <p>Stock quantity:</p>
                                                <p>Gender:</p>
                                                <p>Size:</p>
                                                <p>Color:</p>
                                                <p>Category:</p>
                                                <p>Campaign:</p>
                                            </div>
                                            <div className="col-span-2 font-bold">
                                                <p>{product.id}</p>
                                                <p>{product.stockQuantity}</p>
                                                <p>{product.gender}</p>
                                                <p>{product.size}</p>
                                                <p>{product.color}</p>
                                                <p>{product.category.categoryName}</p>
                                                <p>{product.campaign.campaignName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-12">No Products Found</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Categories;
