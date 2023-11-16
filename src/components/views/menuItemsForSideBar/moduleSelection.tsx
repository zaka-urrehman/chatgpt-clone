'use client'
import Select from "react-select"
import useSWR from "swr"


function fetchModles (){
  const res =  fetch('/api/getEngines').then(res=>res.json())
  return res
}


const ModuleSelection = () => {
    const {data:models, isLoading} = useSWR('models',fetchModles)
    const {data:model , mutate: setModel} = useSWR("model",{
      fallbackData : "text-davinci-003"
    })

  return (
    <div>
      <Select 
      className="text-gray-900"
      options={models?.modelOptions}
      defaultValue={model}
      placeholder={model}
      isSearchable
      isLoading={isLoading}
      menuPosition="fixed"
      classNames={{
        control: (state)=>"bg-[#434654]"
      }}
      onChange={(e)=>setModel(e.value)}
      />
  
    </div>
  )
}

export default ModuleSelection