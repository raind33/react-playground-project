import { PropsWithChildren, useEffect, useState } from "react";
import { Files, PlaygroundContext, Theme } from "./PlaygroundContext";
import { compress, fileName2Language, uncompress } from "./util";
import { initFiles } from "./files";

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props
  const getFilesFromUrl = () => {
    let files: Files | undefined
    try {
        const hash = uncompress(window.location.hash.slice(1))
        files = JSON.parse(hash)
    } catch (error) {
      console.error(error)
    }
    return files
  }
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles)
  const [selectedFileName, setSelectedFileName] = useState('App.tsx');
  const [theme, setTheme] = useState<Theme>('dark');

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: '',
    }
    setFiles({ ...files })
  }
  console.log(files,999);
  const removeFile = (name: string) => {
    delete files[name]
    setFiles({ ...files })
  }
  useEffect(() => {
    const hash = compress(JSON.stringify(files))
    window.location.hash = hash
}, [files])
  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || newFieldName === undefined || newFieldName === null) return
    const { [oldFieldName]: value, ...rest } = files
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName,
      },
    }
    setFiles({
      ...rest,
      ...newFile,
    })
  }

  return (
    <PlaygroundContext.Provider
      value={{
        theme,
        setTheme,
        files,
        selectedFileName,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
