import fs from 'fs';
import path from 'path';

export async function getAllLectures() {
  return (
    await fs.promises.readdir(path.join(process.cwd(), 'posts/teaching/2020-2021/prog1/lectures'))
  )
    .filter((hw) => /\.mdx/.test(hw))
    .map((l) => l.slice(0, -4));
}

export async function getAllHomeworks() {
  return (
    await fs.promises.readdir(path.join(process.cwd(), 'posts/teaching/2020-2021/prog1/homeworks'))
  )
    .filter((hw) => /\.mdx/.test(hw))
    .map((l) => l.slice(0, -4));
}
