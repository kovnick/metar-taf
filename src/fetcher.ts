import https from 'https';

export function sendRequest(requestOptions: https.RequestOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(requestOptions, (res) => {
      if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
        reject(new Error(`Request failed with status ${res.statusCode}`));
        res.resume();
        return;
      }
      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString()));
    });
    req.on('timeout', () => req.destroy(new Error('Request timed out')));
    req.on('error', reject);
  });
}
