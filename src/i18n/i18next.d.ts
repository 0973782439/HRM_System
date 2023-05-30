import { defaultNS, resources } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: true;
    returnEmptyString: true;
    allowObjectInHTMLChildren: true; // add this solve my issue
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
    jsonFormat: "v4";
  }
}
