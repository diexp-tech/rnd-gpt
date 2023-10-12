import { ParseFilePipe, UploadedFile } from "@nestjs/common";

export const UploadMusicFile = (): ParameterDecorator => (
  UploadedFile(
    new ParseFilePipe({}),
  )
);
