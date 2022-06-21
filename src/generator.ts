import { Generator } from 'basketry';
import { kebab } from 'case';

const generator: Generator = (service) => [
  {
    path: [
      `${kebab(service.title.value)}-v${service.majorVersion.value}-ir.json`,
    ],
    contents: JSON.stringify(service, null, 2),
  },
];

export default generator;
