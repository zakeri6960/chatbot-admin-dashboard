'use server';

// import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createRagAction (data) {
  
  const {title} = data;
  const {rag} = data;
  const {category_id} = data;

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
        message: null,
        data: {...newRag}
      }
  } catch (error) {
    return{
      status: 'error',
      message: error?.message,
      data: null
    }
  }
}