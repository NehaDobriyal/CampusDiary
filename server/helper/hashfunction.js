import argon2 from 'argon2';
export async function hashValue(value) {
  try {
    const hash = await argon2.hash(value, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64 MiB
      timeCost: 4, // 4 iterations
      parallelism: 2 // 2 threads
    });
    return hash;
  } catch (err) {
    console.error('Error hashing value:', err);
  }
}
export async function verifyValue(hash, value) {
  try {
    return await argon2.verify(hash, value);
  } catch (err) {
    console.error('Error verifying value:', err);
    return false;
  }
}
