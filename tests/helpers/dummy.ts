import * as Services from '../../src/aliases/services';

export async function client(name = 'John Doe') {
  const client = await Services.ClientService.create({
    name,
  });
  return client.id;
}
