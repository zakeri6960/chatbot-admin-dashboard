'use client';

import { startTransition, useEffect, useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { createRagAction, deleteRagAction } from '../actions';
import { CategoryType, RagType } from '@/lib/types';


export function ToggleButton({ ragData, handleEdit, handleDelete }: any): any {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left md:hidden lg:hidden"
    >
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          ...
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              onClick={(e) => {
                handleEdit(ragData);
              }}
              className="text-blue-700 block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Edit
            </button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <button
              onClick={(e) => {
                handleDelete(ragData.id);
              }}
              className="text-red-700 block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Delete
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

export function RagForm({ setOpenDialog, initialValues, onSubmit, categories }: any) {
  const [form, setForm] = useState(
    initialValues || {
      id: '',
      title: '',
      rag: '',
      category_id: ''
    }
  );

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prevForm: any) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
    setOpenDialog(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="pb-12">
          <p className="mt-1 text-sm/6 text-gray-600">
            
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="rag"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Text
              </label>
              <div className="mt-2">
                <textarea
                  id="rag"
                  name="rag"
                  rows={3}
                  value={form.rag}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm/6"
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="category_id"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="category_id"
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm/6"
                >
                  <option value={0}>Choose Category</option>
                  {categories.map((category : CategoryType) => (
                    <option value={category.id} key={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>

              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-8">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setOpenDialog(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function Rags() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRag, setSelectedRag] = useState(null);
  const [ragsData, setRagsData] = useState();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/rags')
      .then((res) => res.json())
      .then((data) => {
        setRagsData(data?.data); 
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });

      fetch('http://localhost:3001/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.data); 
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleCreate = async (newRag : RagType) => {
    const res = await createRagAction(newRag);
    console.log(res);
    setRagsData([...ragsData, res.data]);
    setOpenDialog(false);
  };

  const handleUpdate = (updatedRag : any) => {
    setRagsData(
      ragsData.map((rag : RagType) => (rag.id === updatedRag.id ? updatedRag : rag))
    );
    setSelectedRag(null);
    setOpenDialog(false);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteRagAction(id);
    if(res.status == 'success'){
      setRagsData(ragsData.filter((rag: RagType) => rag.id !== id));
    }else{
      console.log(res.message)
    }
  };

  const handleEdit = (rag: RagType) => {
    setSelectedRag(rag);
    setOpenDialog(true);
  };

  return (
    <>
      <Tabs
        className=" w-[100%] md:w-[90%] lg:w-[80%] mx-auto mt-8 px-4 overflow-hidden pb-3"
        defaultValue="all"
      >
        <h2 className="text-2xl font-bold text-gray-800 pb-5">Rags</h2>
        <div className="flex items-center mb-6 gap-4">
          <TabsList className="flex gap-3 bg-gray-100 rounded-lg p-1 shadow-sm flex-wrap">
            <TabsTrigger
              value="all"
              className="px-5 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white transition font-semibold"
            >
              All
            </TabsTrigger>
            {categories.map((category: CategoryType) => (
              <TabsTrigger
                key={category.id}
                value={category.title.toLowerCase()}
                className="px-5 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white transition font-semibold"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button
            onClick={() => {
              setSelectedRag(null);
              setOpenDialog(true);
            }}
            size="sm"
            className="ml-auto flex items-center gap-2 h-9 bg-green-600 hover:bg-green-700 transition text-white rounded-lg shadow-md"
            aria-label="Add Rag"
          >
            <PlusCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Add Rag</span>
          </Button>
        </div>

        {ragsData?.length > 0 ? (
          <>
            <TabsContent
              value="all"
              className="p-10 bg-white rounded-lg shadow"
            >
              <RagsTable
                rags={ragsData}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </TabsContent>

            {categories.map((category: CategoryType) => (
              <TabsContent
                key={category.id}
                value={category.title.toLowerCase()}
                className="p-4 bg-white rounded-lg shadow"
              >
                <RagsTable
                  rags={ragsData.filter(
                    (rag) => rag.category_id === category.id
                  )}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </TabsContent>
            ))}
          </>
        ) : (
          <p className="text-center mt-40 text-gray-400 text-lg font-medium">
            There is no rag
          </p>
        )}
      </Tabs>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
          >
            <DialogTitle className="text-xl font-semibold text-gray-900 mb-4">
              {selectedRag ? 'Edit Rag' : 'Add Rag'}
            </DialogTitle>
            <RagForm
              setOpenDialog={setOpenDialog}
              initialValues={selectedRag}
              onSubmit={selectedRag ? handleUpdate : handleCreate}
              categories={categories}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

function RagsTable({ rags, onEdit, onDelete }: any) {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex justify-between border-b border-gray-300 pb-3 mb-4 font-semibold text-gray-700">
        <p className="w-1/5 truncate">Title</p>
        <p className="w-4/5 truncate">Text</p>
        <div className="w-1/5 text-right">Actions</div>
      </div>

      {rags.map((rag: RagType) => (
        <div
          key={rag.id}
          className="flex justify-between items-center p-3 border-b border-gray-200 hover:bg-blue-50 transition rounded-md"
        >
          <p className="w-1/5 truncate font-medium text-gray-800">
            {rag.title}
          </p>
          <p className="w-4/5 truncate text-gray-600">{rag.rag}</p>
          <div className="w-1/5 flex justify-end gap-3 items-center">
            <button
              onClick={() => onEdit(rag)}
              className="hidden md:inline-block px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow"
              aria-label={`Edit ${rag.title}`}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(rag.id)}
              className="hidden md:inline-block px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow"
              aria-label={`Delete ${rag.title}`}
            >
              Delete
            </button>
            <ToggleButton
              ragData={rag}
              handleEdit={onEdit}
              handleDelete={onDelete}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
