import { IsEmail, IsOptional, IsEnum, IsString } from 'class-validator';

export enum TemplateType {
  VERIFICATION_CODE = 'VERIFICATION_CODE',
}

export class SendMailDto {
  constructor(data) {
    Object.assign(this, data);
  }
  @IsEmail()
  readonly to: string;

  @IsString()
  readonly subject: string;

  @IsString()
  readonly text: string;

  @IsString()
  @IsEnum(TemplateType)
  readonly templateType: TemplateType;

  @IsString()
  @IsOptional()
  readonly verificationCode: string;
}
