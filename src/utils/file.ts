import * as path from 'path'
import * as fs from 'fs-extra'
import * as minimatch from 'minimatch'
import * as rimraf from 'rimraf'

export const isMatchPathname = (pathname: string, globs: string[]): boolean => {
  if (globs.length === 0) {
    return false
  }
  for (const glob of globs) {
    if (minimatch(pathname, glob, { matchBase: true, dot: true })) {
      return true
    }
  }
  return false
}

export const existPathname = (pathname: string): boolean => {
  try {
    fs.statSync(pathname)
    return true
  } catch (error) {
    return false
  }
}

const createDir = (pathname: string) => {
  fs.mkdirSync(pathname)
}

export const extractFileName = (pathname: string): string | null => {
  return pathname.split('/').pop() || null
}

export const extractFileExtension = (pathname: string): string | null => {
  return pathname.split('.').pop() || null
}

export const getFilePathnames = (
  dirPathname: string,
  option: { deep?: boolean } = {},
): string[] => {
  const { deep = true } = option
  return fs.readdirSync(dirPathname).reduce(
    (newPathnames, pathname) => {
      const absoluteFilePath = path.join(dirPathname, pathname)
      if (fs.statSync(absoluteFilePath).isDirectory()) {
        newPathnames.push(absoluteFilePath)
        if (deep) {
          return newPathnames.concat(getFilePathnames(absoluteFilePath, option))
        }
        return newPathnames
      }
      return newPathnames.concat(absoluteFilePath)
    },
    [] as string[],
  )
}

export const getFilePathnamesWithFilter = (
  dirPathname: string,
  option: { deep?: boolean; include?: string[]; exclude?: string[] } = {},
): string[] => {
  const { include = [], exclude = [] } = option
  return getFilePathnames(dirPathname, option)
    .filter(
      pathname => exclude.length === 0 || !isMatchPathname(pathname, exclude),
    )
    .filter(
      pathname => include.length === 0 || isMatchPathname(pathname, include),
    )
}

export const removeDir = (dirPathname: string) => {
  rimraf.sync(dirPathname)
}

// Create dir before write file if dir isn't exists
const ensureWriteProcess = (pathname: string) => {
  const fileDirname = path.dirname(pathname)
  if (existPathname(fileDirname)) {
    return
  }
  ensureWriteProcess(fileDirname)
  createDir(fileDirname)
}

export const writeFile = (pathname: string, data: string) => {
  ensureWriteProcess(pathname)
  fs.writeFileSync(pathname, data, { encoding: 'utf-8' })
}

export const readFile = (pathname: string): string => {
  return fs.readFileSync(pathname, { encoding: 'utf-8' })
}
