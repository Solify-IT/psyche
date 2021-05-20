import bcrypt from 'bcrypt';

async function encryptPassword() {
  const args = process.argv.slice(2);
  const newPassword = args[0];
  console.log(`Password: ${newPassword}`);
  if (newPassword) {
    const encryptedPassword = await bcrypt.hash(newPassword, 8);
    console.log(encryptedPassword);
  } else {
    console.log('ERROR: Password not provided');
  }
}

encryptPassword();
