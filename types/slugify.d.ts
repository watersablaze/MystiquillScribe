declare module "slugify" {
  type Options = {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
  };

  function slugify(str: string, options?: Options): string;

  export default slugify;
}
