export default interface Blog {
  id: string;
  title: string;
  author: string;
  datePublished: Date;
  description: string;
  category: string;
  tags: Array<string>;
  imageUrl: string;
  content: string;
}
