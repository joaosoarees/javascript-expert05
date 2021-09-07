import {
  describe,
  test,
  expect,
  jest
} from '@jest/globals';
import fs from 'fs';
import FileHelper from '../../src/fileHelper.js';

import Routes from '../../src/routes.js';

describe('#FileHelper', () => {
  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 920920068,
        mode: 33206,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 562949955251930,
        size: 33157,
        blocks: 72,
        atimeMs: 1630977594313.6438,
        mtimeMs: 1630977594288.068,
        ctimeMs: 1630977594288.068,
        birthtimeMs: 1630977594287.076,
        atime: '2021-09-07T01:19:54.314Z',
        mtime: '2021-09-07T01:19:54.288Z',
        ctime: '2021-09-07T01:19:54.288Z',
        birthtime: '2021-09-07T01:19:54.287Z'
      };

      const mockUser = 'joaosoarees';
      process.env.USER = mockUser;
      const filename = 'file.png';

      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      jest.spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      const result = await FileHelper.getFilesStatus('/tmp');

      const expectedResult = [
        {
          size: "33.2 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    })
  })
})