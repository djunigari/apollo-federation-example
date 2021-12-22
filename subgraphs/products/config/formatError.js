module.exports = (err) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }
    // Otherwise return the original error. The error can also
    // be manipulated in other ways, as long as it's returned.
    return err;
}