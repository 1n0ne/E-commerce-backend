import fs from 'fs/promises'

export const deletImage = async (imagePath: string) => {
  try {
    await fs.unlink(imagePath)
  } catch (error) {
    console.log(error)
    throw error
  }
}
