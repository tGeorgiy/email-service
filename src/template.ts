import { SendMailDto, TemplateType } from './send-mail.dto';

export function fillTemplate(
  data: SendMailDto,
  args: {
    code: string;
  },
) {
  if (data.templateType === TemplateType.VERIFICATION_CODE) {
    if (!args?.code) {
      throw new Error('Code is required');
    }

    return `Hello ${data.to}
Verification code: ${args.code}
`;
  }

  throw new Error('Bad Template type');
}
