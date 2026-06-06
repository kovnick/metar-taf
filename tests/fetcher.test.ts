import { describe, it, expect, vi, afterEach } from 'vitest';
import { sendRequest } from '../src/fetcher';
import https from 'https';
import { EventEmitter } from 'events';

describe('sendRequest', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('resolves with the response body on a 2xx response', async () => {
    const mockRes = Object.assign(new EventEmitter(), { statusCode: 200, resume: vi.fn() });
    vi.spyOn(https, 'get').mockImplementation((_opts: any, cb?: any) => {
      cb(mockRes);
      mockRes.emit('data', Buffer.from('UKBB METAR DATA'));
      mockRes.emit('end');
      return new EventEmitter() as any;
    });

    const result = await sendRequest({ host: 'example.com', path: '/' });
    expect(result).toBe('UKBB METAR DATA');
  });

  it('rejects with a descriptive error on a non-2xx response', async () => {
    const mockRes = Object.assign(new EventEmitter(), { statusCode: 404, resume: vi.fn() });
    vi.spyOn(https, 'get').mockImplementation((_opts: any, cb?: any) => {
      cb(mockRes);
      return new EventEmitter() as any;
    });

    await expect(sendRequest({ host: 'example.com', path: '/' }))
      .rejects.toThrow('Request failed with status 404');
    expect(mockRes.resume).toHaveBeenCalled();
  });

  it('rejects on a network error', async () => {
    const mockReq = new EventEmitter() as any;
    vi.spyOn(https, 'get').mockImplementation(() => {
      setImmediate(() => mockReq.emit('error', new Error('ECONNREFUSED')));
      return mockReq;
    });

    await expect(sendRequest({ host: 'example.com', path: '/' }))
      .rejects.toThrow('ECONNREFUSED');
  });
});
