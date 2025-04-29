"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ModelType } from '@/lib/types';


export default function ProductsPage() {

  const [models, setModels] = useState([]);
  const [activeModel, setActiveModel] = useState(models.find((m: ModelType)=> m.active)?.id || null);

  useEffect(()=>{
    fetch("http://localhost:3001/models").then((res)=> res.json()).then((data)=> setModels(data.data))
  }, []);

  useEffect(()=>{
    fetch("http://localhost:3001/models/active", {
      method: "Post",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({modelId: activeModel})
    });
  }, [activeModel, models])
  
  const handleChangeModel = (modelId: string)=>{
    const updatedModels = models.map((m: ModelType) => ({
      ...m,
      active: m.id == modelId,
    }));

    setModels(updatedModels);
    setActiveModel(modelId);
  }

  return (
    <Tabs defaultValue="all" className="w-full max-w-5xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Models</h2>
        <Button
          size="sm"
          className="h-9 gap-2 bg-green-600 hover:bg-green-700 transition text-white rounded-lg shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Add Model</span>
        </Button>
      </div>
      
      <TabsContent value="all">
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Parameter Size</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">On/Off</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {models.map((model: ModelType) => (
                <tr
                  key={model.id}
                  onClick={()=> handleChangeModel(model.id)}
                  className="hover:bg-blue-50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{model.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.parameter_size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold", model.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                      {model.active ? "On" : "Off"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="radio" checked={model.active} name="model" onChange={()=> handleChangeModel(model.id)} className="accent-blue-600" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
