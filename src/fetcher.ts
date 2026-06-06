import https from 'https';

export class Fetcher {
  sendRequest(requestOptions: https.RequestOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      const req = https.get(requestOptions, (response) => {
        const chunks: Buffer[] = [];
        response.on('data', (chunk: Buffer) => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks).toString()));
      });
      req.on('error', reject);
    });
  }
}
