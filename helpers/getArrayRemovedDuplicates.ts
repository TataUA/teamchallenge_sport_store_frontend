import { IColor, IColors } from "@/services/types";

  const getArrayRemovedColorsDuplicates = (array: IColors[]):IColor[]  => {
    const copiedColors = [...array].map(item => JSON.stringify(item.color))
    const set = new Set(copiedColors)
    return Array.from(set).map((item) => JSON.parse(item));
  }

  export default getArrayRemovedColorsDuplicates
  