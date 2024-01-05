import jwt from 'jsonwebtoken'

// Function to create a JSON Web Token (JWT) with a custom secret key and optional expiration time
export const createJSONWebToken = (
  tokenPayload: object,
  secretKey: string,
  expiresIn = ''
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    if (!tokenPayload || Object.keys(tokenPayload).length === 0) {
      throw new Error('tokenPayload must be a non-empty object')
    }

    if (typeof secretKey !== 'string' || secretKey === '') {
      throw new Error('secretKey must be a non-empty string')
    }

    const token = jwt.sign(tokenPayload, secretKey, {
      expiresIn
    })
    return token
  } catch (error) {
    throw error
  }
}
