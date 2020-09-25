import fs from 'fs';
import path from 'path';

export async function getAllLectures(lectureId: string) {
  return (
    await fs.promises.readdir(
      path.join(process.cwd(), `posts/teaching/2020-2021/${lectureId}/lectures`),
    )
  )
    .filter((hw) => /\.mdx/.test(hw))
    .map((l) => l.slice(0, -4));
}

export async function getAllHomeworks(lectureId: string) {
  return (
    await fs.promises.readdir(
      path.join(process.cwd(), `posts/teaching/2020-2021/${lectureId}/homeworks`),
    )
  )
    .filter((hw) => /\.mdx/.test(hw))
    .map((l) => l.slice(0, -4));
}
