import bcrypt from 'bcrypt';

/**
 * Password hashing and verification utilities
 * Uses bcrypt with salt rounds for secure password storage
 */

const SALT_ROUNDS = 12; // Higher = more secure but slower (10-12 is recommended)

/**
 * Hash a plaintext password using bcrypt
 * @param password - The plaintext password to hash
 * @returns Promise<string> - The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length === 0) {
    throw new Error('Password cannot be empty');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a plaintext password against a hashed password
 * Uses constant-time comparison to prevent timing attacks
 * @param plaintext - The plaintext password to verify
 * @param hashed - The hashed password to compare against
 * @returns Promise<boolean> - True if passwords match, false otherwise
 */
export async function verifyPassword(plaintext: string, hashed: string): Promise<boolean> {
  if (!plaintext || !hashed) {
    return false;
  }
  
  try {
    return await bcrypt.compare(plaintext, hashed);
  } catch (error) {
    // If comparison fails (invalid hash format, etc.), return false
    console.error('Password verification error:', error);
    return false;
  }
}

/**
 * Check if a password meets minimum security requirements
 * @param password - The password to validate
 * @returns boolean - True if password is valid
 */
export function isValidPassword(password: string): boolean {
  if (!password || password.length < 8) {
    return false;
  }
  
  // Must contain at least:
  // - One uppercase letter
  // - One lowercase letter
  // - One number
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumber;
}

/**
 * Generate a secure random password
 * @returns string - A secure random password
 */
export function generateSecurePassword(): string {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  // Ensure at least one of each required character type
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
  password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
  password += '0123456789'[Math.floor(Math.random() * 10)]; // Number
  password += '!@#$%^&*'[Math.floor(Math.random() * 8)]; // Special char
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}



