'use server';

import { RagType } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import {z} from "zod";

const createRagSchema = z.object({
  title: z.string().min(1, "Please write a suitable title"),
  rag: z.string().min(1, "Please enter a suitable description"),
  category_id: z.string().min(1, "Please select a category"),
});

const updateRagSchema = z.object({
  id: z.string().min(1, "No ID"),
  title: z.string().min(1, "Please write a suitable title"),
  rag: z.string().min(1, "Please enter a suitable description"),
  category_id: z.string().min(1, "Please select a category"),
});

export async function createRagAction (data: RagType) {
  
  // const {title} = data;
  // const {rag} = data;
  // const {category_id} = data;

  const parseResult = createRagSchema.safeParse(data);

  if (!parseResult.success) {
    const errors = parseResult.error.errors.map(err => err.message).join("، ");
    return {
      status: 'error',
      message: errors,
      data: null
    };
  }

  const { title, rag, category_id } = parseResult.data;

  try {
    const res = await fetch("http://localhost:3001/rags/create", {
      method: "Post",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, rag, category_id})
    });

    if(!res){
      return{
        status: 'error',
        message: "Create rag failed!",
        data: null
      }
    }

    const resJson = await res.json();
    const newRag = resJson.data;
    revalidatePath("/rags");
      return{
        status: 'success',
        message: "Create rag successful",
        data: {
          id: String(newRag.id),
          title: newRag.title,
          rag: newRag.rag,
          category_id: String(newRag.category_id)
        }
      }
  } catch (error: any) {
    return{
      status: 'error',
      message: error.message,
      data: null
    }
  }
}

export async function updateRagAction (data: RagType) {
  
  const parseResult = updateRagSchema.safeParse(data);

  if (!parseResult.success) {
    const errors = parseResult.error.errors.map(err => err.message).join("، ");
    return {
      status: 'error',
      message: errors,
      data: null
    };
  }

  const { id, title, rag, category_id } = parseResult.data;

  try {
    const res = await fetch("http://localhost:3001/rags/update", {
      method: "Post",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, title, rag, category_id})
    });

    if(!res){
      return{
        status: 'error',
        message: "Update rag failed!",
        data: null
      }
    }

    const resJson = await res.json();
    const updatedRag = resJson.data;
    revalidatePath("/rags");
      return{
        status: 'success',
        message: "Update rag successful",
        data: {...updatedRag}
      }
  } catch (error: any) {
    return{
      status: 'error',
      message: error.message,
      data: null
    }
  }
}

export async function deleteRagAction(id: string) {
  try {
    const res = await fetch("http://localhost:3001/rags/delete", {
      method: "Delete",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({ragId: id})
    });

    if(!res){
      return{
        status: 'error',
        message: 'Delete rag failed',
        data: null
      }
    }else{
      const data = await res.json();
      return {
        status: data.status,
        message: data.message,
        data: null
      }
    }
  } catch (error: any) {
    return{
      status: 'error',
      message: error.message,
      data: null
    }
  }
}