'use client';

import { useState } from 'react';
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
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// داده‌های نمونه
const rags = [
  {
    id: 1,
    title: 'ddsdsd',
    category_id: 2,
    rag: 'dfdgrgfgbtyyhtygiuonhinjifnvfoinvfivnf'
  },
  {
    id: 2,
    title: 'ddsdsd',
    category_id: 1,
    rag: 'dfdgrgfgbtyyhtygiuonhinjifnvfoinvfivnf'
  },
  {
    id: 3,
    title: 'ddsdsd',
    category_id: 2,
    rag: 'dfdgrgfgbtyyhtygiuonhinjifnvfoinvfivnf'
  },
  {
    id: 4,
    title: 'ddsdsd',
    category_id: 3,
    rag: 'dfdgrgfgbtyyhtygiuonhinjifnvfoinvfivnf'
  }
];

const categories = [
  { id: 1, title: 'Supplement' },
  { id: 2, title: 'Food' },
  { id: 3, title: 'Vico' }
];

// دکمه منوی اکشن برای موبایل
export function ToggleButton() {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left md:hidden lg:hidden"
    >
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          {/* آیکون منو */}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="text-blue-700 block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Edit
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="text-red-700 block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Delete
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

// RagForm Component
export function RagForm({ setOpenDialog, initialValues, onSubmit }) {
  const [form, setForm] = useState(
    initialValues || {
      title: '',
      about: '',
      country: 'United States'
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setOpenDialog(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="pb-12">
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Title */}
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
            {/* About */}
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={form.about}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm/6"
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
            {/* Country */}
            <div className="col-span-full">
              <label
                htmlFor="country"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Country
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm/6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
              {/* Buttons */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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

// Rags Component
export default function Rags() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRag, setSelectedRag] = useState(null); // State to hold selected rag for editing
  const [ragsData, setRagsData] = useState(rags); // Use useState to manage rags

  const handleCreate = (newRag) => {
    const newId =
      ragsData.length > 0 ? Math.max(...ragsData.map((r) => r.id)) + 1 : 1;
    const createdRag = { ...newRag, id: newId, category_id: 1 }; // You might need to adjust category_id
    setRagsData([...ragsData, createdRag]);
  };

  const handleUpdate = (updatedRag) => {
    setRagsData(
      ragsData.map((rag) => (rag.id === updatedRag.id ? updatedRag : rag))
    );
    setSelectedRag(null); // Clear selected rag after update
  };

  const handleDelete = (id) => {
    setRagsData(ragsData.filter((rag) => rag.id !== id));
  };

  const handleEdit = (rag) => {
    setSelectedRag(rag);
    setOpenDialog(true);
  };

  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all" key="all">
              All
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                value={category.title.toLowerCase()}
                key={category.id}
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="ml-auto flex items-center gap-1">
            <Button
              onClick={() => {
                setSelectedRag(null);
                setOpenDialog(true);
              }}
              size="sm"
              className="h-8 gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Rag
              </span>
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <div className="w-full h-full p-4">
            <div className="flex justify-between w-full border-b border-gray-300 pb-2 mb-2 font-semibold">
              <p className="w-1/5">Title</p>
              <p className="w-4/5">Text</p>
              <div className="w-1/5 text-right">Actions</div>
            </div>
            {ragsData.map(({ id, title, rag }) => (
              <div
                key={id}
                className="flex justify-between w-full items-center py-2 border-b border-gray-200"
              >
                <p className="w-1/5 truncate">{title}</p>
                <p className="w-4/5 truncate">{rag}</p>
                <div className="w-1/5 flex justify-end gap-2 items-center">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition hidden md:block lg:block"
                    onClick={() =>
                      handleEdit({
                        id,
                        title,
                        about: rag,
                        country: 'United States'
                      })
                    } // Corrected to pass the rag object
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition hidden md:block lg:block"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                  <ToggleButton />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.title.toLowerCase()}>
            <div className="w-full h-full p-4">
              <div className="flex justify-between w-full border-b border-gray-300 pb-2 mb-2 font-semibold">
                <p className="w-1/5">Title</p>
                <p className="w-4/5">Text</p>
                <div className="w-1/5 text-right">Actions</div>
              </div>

              {ragsData
                .filter((rag) => rag.category_id === category.id)
                .map((rag) => (
                  <div
                    key={rag.id}
                    className="flex justify-between w-full items-center py-2 border-b border-gray-200"
                  >
                    <p className="w-1/5 truncate">{rag.title}</p>
                    <p className="w-4/5 truncate">{rag.rag}</p>
                    <div className="w-1/5 flex justify-end gap-2 items-center ">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition hidden md:block lg:block"
                        onClick={() =>
                          handleEdit({
                            id,
                            title,
                            about: rag.rag,
                            country: 'United States'
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition hidden md:block lg:block"
                        onClick={() => handleDelete(rag.id)}
                      >
                        Delete
                      </button>
                      <ToggleButton />
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className="relative z-20"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      {selectedRag ? 'Edit Rag' : 'Add Rag'}
                    </DialogTitle>
                    <RagForm
                      setOpenDialog={setOpenDialog}
                      initialValues={selectedRag}
                      onSubmit={selectedRag ? handleUpdate : handleCreate}
                    />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
