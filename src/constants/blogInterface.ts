import Author from "./authorInterface";

export default interface Blog {
  id: string;
  title: string;
  author: Author;
  datePublished: Date;
  description: string;
  category: string;
  tags: Array<string>;
  imageUrl: string;
  content: string;
}
