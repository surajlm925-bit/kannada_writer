const response = await fetch('http://localhost:8000/package_writer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ prompt: input }),
});