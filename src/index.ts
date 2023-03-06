import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { validate } from 'class-validator';
import * as Sendgrid from '@sendgrid/mail';

import { SendMailDto } from './send-mail.dto';
import { fillTemplate } from './template';

Sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const data = new SendMailDto(req.body);

  // Validation
  try {
    await validate(data, { whitelist: true });
  } catch (e) {
    context.res = {
      code: 400,
      body: 'Validation error',
    };

    return;
  }

  let html: string;

  try {
    html = fillTemplate(data, { code: '123 456' });
  } catch (e) {
    context.res = {
      code: 500,
    };

    return;
  }

  // Create mail message
  const msg = {
    to: data.to,
    from: 'test@example.com',
    subject: data.subject,
    text: data.text,
    html,
  };

  // Send email
  try {
    await Sendgrid.send(msg);
  } catch (error) {
    context.res = {
      code: 400,
      body: 'Could not send email',
    };
  }
};

export default httpTrigger;
