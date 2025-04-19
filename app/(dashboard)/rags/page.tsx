'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import RagForm from '@/components/ragForm';

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

export function ToggleButton() {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left md:hidden lg:hidden"
    >
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          ...
          {/* <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" /> */}
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
              className="text-blue-700 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Edit
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="text-red-700 block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Delete
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default function Rags() {
  const [openDialog, setOpenDialog] = useState(true);
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
              onClick={() => setOpenDialog(true)}
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

            {rags.map(({ id, title, rag }) => (
              <div
                key={id}
                className="flex justify-between w-full items-center py-2 border-b border-gray-200"
              >
                <p className="w-1/5 truncate">{title}</p>
                <p className="w-4/5 truncate">{rag}</p>
                <div className="w-1/5 flex justify-end gap-2 items-center">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition hidden md:block lg:block">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition hidden md:block lg:block">
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

              {rags
                .filter((rag) => rag.category_id === category.id)
                .map((rag) => (
                  <div
                    key={rag.id}
                    className="flex justify-between w-full items-center py-2 border-b border-gray-200"
                  >
                    <p className="w-1/5 truncate">{rag.title}</p>
                    <p className="w-4/5 truncate">{rag.rag}</p>
                    <div className="w-1/5 flex justify-end gap-2 items-center ">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition hidden md:block lg:block">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition hidden md:block lg:block">
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
        onClose={setOpenDialog}
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
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Rag
                    </DialogTitle>
                    <RagForm />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpenDialog(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:  -auto"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenDialog(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
