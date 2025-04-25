import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "../models/book.model.js";
import { connectDB } from "../lib/db.js";

dotenv.config();

const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A powerful story of race, justice, and innocence lost in a Southern town. Told through the eyes of Scout Finch, the novel explores human behavior and the need for moral courage.",
    coverImage:
      "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fiction", "Classic", "Coming-of-age"],
    publicationYear: 1960,
    publisher: "J. B. Lippincott & Co.",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel set in a totalitarian regime where government surveillance is omnipresent. The story follows Winston Smith's rebellion against the Party and Big Brother.",
    coverImage:
      "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fiction", "Dystopian", "Political"],
    publicationYear: 1949,
    publisher: "Secker & Warburg",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "Set in the Jazz Age, this novel depicts the story of enigmatic millionaire Jay Gatsby and his obsession with Daisy Buchanan. A tale of wealth, love, and the American Dream.",
    coverImage:
      "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fiction", "Classic", "Romance"],
    publicationYear: 1925,
    publisher: "Charles Scribner's Sons",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    description:
      "An epic science fiction novel set in the distant future amid a feudal interstellar society. The story focuses on Paul Atreides, whose family accepts stewardship of the desert planet Arrakis.",
    coverImage:
      "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Science Fiction", "Adventure"],
    publicationYear: 1965,
    publisher: "Chilton Books",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A romantic novel focusing on the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments. The novel explores themes of marriage, reputation, and class.",
    coverImage:
      "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fiction", "Classic", "Romance"],
    publicationYear: 1813,
    publisher: "T. Egerton",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "A fantasy novel about the journey of home-loving Bilbo Baggins who is convinced by the wizard Gandalf to join thirteen dwarves in their quest to reclaim their home from a dragon.",
    coverImage:
      "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fantasy", "Adventure"],
    publicationYear: 1937,
    publisher: "George Allen & Unwin",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "A dystopian novel set in a futuristic World State, inhabited by genetically modified citizens ranked by intelligence. The book anticipates developments in reproductive technology and psychological manipulation.",
    coverImage:
      "https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Science Fiction", "Dystopian"],
    publicationYear: 1932,
    publisher: "Chatto & Windus",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "The story of Holden Caulfield, a teenage boy dealing with issues of identity, belonging, loss, and connection. A classic coming-of-age novel.",
    coverImage:
      "https://m.media-amazon.com/images/I/61fgOuZfYGL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fiction", "Coming-of-age"],
    publicationYear: 1951,
    publisher: "Little, Brown and Company",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "An epic high-fantasy novel following the journey to destroy the One Ring, a powerful artifact created by the Dark Lord Sauron. Its destruction is the only way to ensure Sauron's downfall.",
    coverImage:
      "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fantasy", "Adventure", "Epic"],
    publicationYear: 1954,
    publisher: "Allen & Unwin",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description:
      "The first novel in the Harry Potter series follows a young wizard who discovers his magical heritage and begins his education at Hogwarts School of Witchcraft and Wizardry.",
    coverImage:
      "https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fantasy", "Young Adult"],
    publicationYear: 1997,
    publisher: "Bloomsbury",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A philosophical novel about a young Andalusian shepherd who dreams of finding worldly treasures and embarks on a journey to fulfill his personal legend.",
    coverImage: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    genre: ["Fiction", "Philosophy", "Quest"],
    publicationYear: 1988,
    publisher: "HarperOne",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    description:
      "In a dystopian future, the nation of Panem forces children to participate in a televised battle to the death. Katniss Everdeen volunteers to save her sister and becomes a symbol of rebellion.",
    coverImage:
      "https://m.media-amazon.com/images/I/61+t8dh4BEL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Young Adult", "Dystopian", "Science Fiction"],
    publicationYear: 2008,
    publisher: "Scholastic",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "The Road",
    author: "Cormac McCarthy",
    description:
      "A post-apocalyptic tale of a journey taken by a father and his young son over a period of several months, across a landscape blasted by an unspecified cataclysm.",
    coverImage:
      "https://m.media-amazon.com/images/I/71IJ1HyxtRL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fiction", "Post-Apocalyptic", "Dystopian"],
    publicationYear: 2006,
    publisher: "Alfred A. Knopf",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    description:
      "The multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo. The magical realist style and thematic content of the novel established it as an important representative novel of the literary Latin American Boom of the 1960s and 1970s.",
    coverImage:
      "https://m.media-amazon.com/images/I/91mftQtgAkL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Magical Realism", "Fiction", "Classic"],
    publicationYear: 1967,
    publisher: "Harper & Row",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    description:
      "The story of Amir, a young boy from Kabul, whose closest friend is Hassan. The story is set against a backdrop of tumultuous events, from the fall of Afghanistan's monarchy through the Soviet invasion and the rise of the Taliban regime.",
    coverImage:
      "https://m.media-amazon.com/images/I/81IzbD2IiIL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Historical Fiction", "Drama"],
    publicationYear: 2003,
    publisher: "Riverhead Books",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    description:
      "A novel focusing on the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker for her money.",
    coverImage:
      "https://m.media-amazon.com/images/I/81EcXiV-3QL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Psychological Fiction", "Classic", "Philosophical"],
    publicationYear: 1866,
    publisher: "The Russian Messenger",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description:
      "A mystery thriller novel that follows symbologist Robert Langdon and cryptologist Sophie Neveu as they investigate a murder in Paris's Louvre Museum and discover a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having been a couple.",
    coverImage:
      "https://m.media-amazon.com/images/I/81C+OiZMN4L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Mystery", "Thriller", "Conspiracy Fiction"],
    publicationYear: 2003,
    publisher: "Doubleday",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    description:
      "Set in a near-future New England, in a totalitarian state resembling a theonomy that overthrows the United States government, the novel explores themes of women subjugated in a patriarchal society.",
    coverImage:
      "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Dystopian", "Feminist", "Science Fiction"],
    publicationYear: 1985,
    publisher: "McClelland & Stewart",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    description:
      "The story of Liesel Meminger, a girl living with her foster family in Nazi Germany. The narrative is told by Death, who becomes intrigued by Liesel after she steals a book at her brother's funeral.",
    coverImage:
      "https://m.media-amazon.com/images/I/91L83gTN9YL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Historical Fiction", "Young Adult"],
    publicationYear: 2005,
    publisher: "Picador",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    description:
      "A comedic science fiction series following the adventures of an unwitting human, Arthur Dent, after the Earth is destroyed to make way for a hyperspace bypass.",
    coverImage:
      "https://m.media-amazon.com/images/I/81XSN3hA5gL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Science Fiction", "Comedy", "Satire"],
    publicationYear: 1979,
    publisher: "Pan Books",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    description:
      "A poetic tale that explores the perspectives of children and adults. It tells the story of a little prince who visits Earth after journeying through the universe.",
    coverImage:
      "https://m.media-amazon.com/images/I/71OZY035QKL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Children's Literature", "Fantasy", "Philosophical"],
    publicationYear: 1943,
    publisher: "Reynal & Hitchcock",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    description:
      "The story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment, exploring themes of creation, responsibility, and the consequences of playing god.",
    coverImage:
      "https://m.media-amazon.com/images/I/71Qv4QUPCIL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Gothic", "Science Fiction", "Horror"],
    publicationYear: 1818,
    publisher: "Lackington, Hughes, Harding, Mavor, & Jones",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    description:
      "The story of Captain Ahab's quest to avenge the whale that 'reaped' his leg. The novel explores themes of class and social status, good and evil, and the existence of God.",
    coverImage:
      "https://m.media-amazon.com/images/I/71L+VB6ZZ+L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Adventure", "Epic", "Classic"],
    publicationYear: 1851,
    publisher: "Harper & Brothers",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    description:
      "The story follows the emotions and experiences of Jane Eyre, including her growth to adulthood and her love for Mr. Rochester, the brooding master of Thornfield Hall.",
    coverImage:
      "https://m.media-amazon.com/images/I/81fFBfOUS7L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Gothic", "Romance", "Classic"],
    publicationYear: 1847,
    publisher: "Smith, Elder & Co.",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Odyssey",
    author: "Homer",
    description:
      "An epic poem following the Greek hero Odysseus's journey home after the fall of Troy. It takes Odysseus ten years to reach Ithaca after the ten-year Trojan War.",
    coverImage:
      "https://m.media-amazon.com/images/I/71K96aQT1GL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Epic Poetry", "Classic", "Mythology"],
    publicationYear: -800,
    publisher: "Ancient Greece",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    description:
      "Four siblings are evacuated from London during World War II and sent to live with a professor. They discover a wardrobe that leads to the magical land of Narnia, which is under the spell of the White Witch.",
    coverImage:
      "https://m.media-amazon.com/images/I/81nOhD4nw9L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fantasy", "Children's Literature"],
    publicationYear: 1950,
    publisher: "Geoffrey Bles",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    description:
      "The story of a fashionable young man who sells his soul for eternal youth and beauty. The novel explores the themes of vanity, immorality, and self-indulgence.",
    coverImage:
      "https://m.media-amazon.com/images/I/71RUJQhbBZL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Gothic", "Philosophical", "Classic"],
    publicationYear: 1890,
    publisher: "Lippincott's Monthly Magazine",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    description:
      "A wild, passionate story of the intense and almost demonic love between Catherine Earnshaw and Heathcliff, a foundling adopted by Catherine's father.",
    coverImage:
      "https://m.media-amazon.com/images/I/91+ljiauRGL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Gothic", "Romance", "Tragedy"],
    publicationYear: 1847,
    publisher: "Thomas Cautley Newby",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Iliad",
    author: "Homer",
    description:
      "An ancient Greek epic poem set during the Trojan War, focusing on a quarrel between King Agamemnon and the warrior Achilles.",
    coverImage:
      "https://m.media-amazon.com/images/I/718QhHk1wBL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Epic Poetry", "Classic", "Mythology"],
    publicationYear: -750,
    publisher: "Ancient Greece",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    description:
      "The novel tells the story of Dracula's attempt to move from Transylvania to England to spread the undead curse, and the battle between Dracula and a small group of people led by Professor Abraham Van Helsing.",
    coverImage:
      "https://m.media-amazon.com/images/I/81a5KHEkwQL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Gothic", "Horror", "Vampire Fiction"],
    publicationYear: 1897,
    publisher: "Archibald Constable and Company",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    description:
      "An adventure story primarily concerned with themes of hope, justice, vengeance, mercy, and forgiveness. The story takes place in France, Italy, and islands in the Mediterranean during 1815–1839.",
    coverImage:
      "https://m.media-amazon.com/images/I/61lt3jCea-L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Adventure", "Historical Fiction"],
    publicationYear: 1844,
    publisher: "Pétion",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    description:
      "The novel depicts Huck's moral growth as he encounters various characters during his journey down the Mississippi River. It challenges prevailing attitudes, particularly racism.",
    coverImage:
      "https://m.media-amazon.com/images/I/61Yw4pgJQwL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Adventure", "Satire", "Picaresque"],
    publicationYear: 1884,
    publisher: "Chatto & Windus",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    description:
      "The story of the Joads, a poor family of tenant farmers driven from their Oklahoma home by drought, economic hardship, agricultural industry changes, and bank foreclosures during the Great Depression.",
    coverImage:
      "https://m.media-amazon.com/images/I/61xvxU1vFvL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Historical Fiction", "Realistic Fiction"],
    publicationYear: 1939,
    publisher: "The Viking Press",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    description:
      "Set in London and Paris before and during the French Revolution, the novel depicts the plight of the French peasantry under the demoralized French aristocracy, the corresponding brutality demonstrated by the revolutionaries, and parallels with life in London.",
    coverImage:
      "https://m.media-amazon.com/images/I/61c5tVEX2jL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Historical Fiction", "Classic"],
    publicationYear: 1859,
    publisher: "Chapman & Hall",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    description:
      "The story of a man who becomes so enamored by reading chivalric romances that he loses his sanity and decides to become a knight-errant to revive chivalry and serve his nation.",
    coverImage:
      "https://m.media-amazon.com/images/I/71NbXW-GI7L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Satire", "Novel", "Classic"],
    publicationYear: 1605,
    publisher: "Francisco de Robles",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    description:
      "An Italian narrative poem representing a journey through Hell, Purgatory, and Paradise. It serves as an allegory of the soul's journey towards God.",
    coverImage:
      "https://m.media-amazon.com/images/I/71PVQZrN2tL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Epic Poetry", "Classic", "Allegorical"],
    publicationYear: 1320,
    publisher: "Italy",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    description:
      "A complex novel revolving around Anna, who abandons her son and husband for Count Vronsky, and the various other characters who search for self-knowledge and meaning in their own lives.",
    coverImage:
      "https://m.media-amazon.com/images/I/71DUKiXQ1RL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Realist Novel", "Tragedy", "Classic"],
    publicationYear: 1877,
    publisher: "The Russian Messenger",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    description:
      "The story examines the nature of law and grace, elaborating upon the history of France, architecture of Paris, politics, moral philosophy, antimonarchism, justice, religion, and the types and nature of romantic and familial love.",
    coverImage:
      "https://m.media-amazon.com/images/I/81PFiPXCXkL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Historical Fiction", "Epic"],
    publicationYear: 1862,
    publisher: "A. Lacroix, Verboeckhoven & Cie.",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    description:
      "A dystopian novel set in a future American society where books are outlawed and 'firemen' burn any that are found. The novel follows Guy Montag, a fireman who becomes disillusioned with his role of censoring literature.",
    coverImage:
      "https://m.media-amazon.com/images/I/71OFqSRFDgL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Dystopian", "Science Fiction"],
    publicationYear: 1953,
    publisher: "Ballantine Books",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    description:
      "Set in 17th-century Puritan Massachusetts Bay Colony, the novel tells the story of Hester Prynne, who conceives a daughter through an affair and then struggles to create a new life of repentance and dignity.",
    coverImage:
      "https://m.media-amazon.com/images/I/71tiThLXi9L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Romantic", "Historical Fiction", "Gothic"],
    publicationYear: 1850,
    publisher: "Ticknor, Reed & Fields",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    description:
      "A novel that chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.",
    coverImage:
      "https://m.media-amazon.com/images/I/914-sYJaOFL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Historical Fiction", "Epic"],
    publicationYear: 1869,
    publisher: "The Russian Messenger",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "A Clockwork Orange",
    author: "Anthony Burgess",
    description:
      "The novel explores the violent nature of humans, juvenile delinquency, youth gangs, and the possibility of redemption. It is set in a near-future society that has a youth subculture of extreme violence.",
    coverImage:
      "https://m.media-amazon.com/images/I/71eq364+MlL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Dystopian", "Science Fiction"],
    publicationYear: 1962,
    publisher: "William Heinemann",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Catch-22",
    author: "Joseph Heller",
    description:
      "A satirical novel set during World War II, the novel follows Captain John Yossarian, a U.S. Army Air Forces B-25 bombardier, and other airmen in the camp, who attempt to maintain their sanity while fulfilling their service requirements so that they may return home.",
    coverImage:
      "https://m.media-amazon.com/images/I/81MN-kKqP6L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Satire", "Dark Comedy", "War Fiction"],
    publicationYear: 1961,
    publisher: "Simon & Schuster",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    description:
      "The novel follows the life and experiences of Billy Pilgrim, from his early years to his time as an American soldier and chaplain's assistant during World War II, to the postwar years, with Billy occasionally traveling through time.",
    coverImage:
      "https://m.media-amazon.com/images/I/71QcX1DbklL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Science Fiction", "Satire", "War Fiction"],
    publicationYear: 1969,
    publisher: "Delacorte",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "Lolita",
    author: "Vladimir Nabokov",
    description:
      "The novel is notable for its controversial subject: the protagonist and unreliable narrator, a middle-aged literature professor under the pseudonym Humbert Humbert, is obsessed with a 12-year-old girl, Dolores Haze, with whom he becomes sexually involved after he becomes her stepfather.",
    coverImage:
      "https://m.media-amazon.com/images/I/91bD9MlImdL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Novel", "Erotic Literature", "Tragicomedy"],
    publicationYear: 1955,
    publisher: "Olympia Press",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    description:
      "The book portrays the moral struggles of three Russian brothers: Dmitri, Ivan, and Alexei Karamazov. It explores themes of faith, doubt, morality, and the existence of God through philosophical debates and complex characters.",
    coverImage:
      "https://m.media-amazon.com/images/I/91rtkwzv7QL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Philosophical Novel", "Family Drama"],
    publicationYear: 1880,
    publisher: "The Russian Messenger",
    featured: false,
    reviewCount: 0,
  },

  {
    title: "The Sun Also Rises",
    author: "Ernest Hemingway",
    description:
      "The novel follows a group of American and British expatriates who travel from Paris to the Festival of San Fermín in Pamplona to watch the running of the bulls and the bullfights, exploring themes of disillusionment and angst in the post-World War I generation.",
    coverImage:
      "https://m.media-amazon.com/images/I/81OthjkJBuL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Philosophical Novel", "Family Drama"],
    publicationYear: 1880,
    publisher: "The Russian Messenger",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    description:
      "The book portrays the moral struggles of three Russian brothers: Dmitri, Ivan, and Alexei Karamazov. It explores themes of faith, doubt, morality, and the existence of God through philosophical debates and complex characters.",
    coverImage:
      "https://m.media-amazon.com/images/I/91rtkwzv7QL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Philosophical Novel", "Family Drama"],
    publicationYear: 1880,
    publisher: "The Russian Messenger",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    description:
      "The story of an aging Cuban fisherman who struggles with a giant marlin far out in the Gulf Stream. A tale of courage, determination, and personal triumph in the face of defeat.",
    coverImage:
      "https://m.media-amazon.com/images/I/71KloredA-L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fiction", "Novella", "Adventure"],
    publicationYear: 1952,
    publisher: "Charles Scribner's Sons",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Shining",
    author: "Stephen King",
    description:
      "The story follows Jack Torrance, his wife Wendy, and their son Danny as they move into the isolated Overlook Hotel. As Danny's psychic abilities strengthen, the supernatural forces within the hotel grow more threatening.",
    coverImage:
      "https://m.media-amazon.com/images/I/91aRTpV2ntL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Horror", "Supernatural Fiction", "Thriller"],
    publicationYear: 1977,
    publisher: "Doubleday",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    description:
      "The autobiography of Kvothe, an adventurer and musician who grows to become a notorious wizard. It follows his journey from childhood in a troupe of traveling players to his life as a fugitive after the murder of the king.",
    coverImage:
      "https://m.media-amazon.com/images/I/91b8oNwaV1L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fantasy", "Epic", "Adventure"],
    publicationYear: 2007,
    publisher: "DAW Books",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description:
      "A book that explores the history and impact of Homo sapiens on the world. It spans the entire history of the species, from the evolution of archaic human species to the political and technological revolutions of the 21st century.",
    coverImage:
      "https://m.media-amazon.com/images/I/71N6LGrGTlL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Non-fiction", "History", "Anthropology"],
    publicationYear: 2011,
    publisher: "Harper",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "Neuromancer",
    author: "William Gibson",
    description:
      "A groundbreaking cyberpunk novel that follows a washed-up computer hacker hired by a mysterious employer to pull off the ultimate hack. It explores themes of artificial intelligence, virtual reality, and corporate power in a dystopian future.",
    coverImage:
      "https://m.media-amazon.com/images/I/81iR0O2X5xL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Science Fiction", "Cyberpunk"],
    publicationYear: 1984,
    publisher: "Ace",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Road Not Taken and Other Poems",
    author: "Robert Frost",
    description:
      "A collection of poems by one of America's most beloved poets, including 'The Road Not Taken,' 'Fire and Ice,' 'Nothing Gold Can Stay,' and other classics that explore themes of nature, individuality, and life choices.",
    coverImage:
      "https://m.media-amazon.com/images/I/71Vb9Zbs4FL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Poetry", "American Literature"],
    publicationYear: 1916,
    publisher: "Henry Holt and Company",
    featured: false,
    reviewCount: 0,
  },
  {
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    description:
      "The first book in the Remembrance of Earth's Past trilogy, this science fiction novel explores humanity's first contact with an alien civilization. Set against the backdrop of China's Cultural Revolution, it blends hard science fiction with historical fiction.",
    coverImage:
      "https://m.media-amazon.com/images/I/919XM42JQlL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Science Fiction", "Hard Science Fiction"],
    publicationYear: 2008,
    publisher: "Chongqing Publishing Group",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    description:
      "The story follows an astronaut who becomes stranded alone on Mars and must use his scientific ingenuity to survive and find a way to communicate with Earth. A tale of human perseverance and scientific problem-solving.",
    coverImage:
      "https://m.media-amazon.com/images/I/81wFMY9OAQL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Science Fiction", "Adventure"],
    publicationYear: 2011,
    publisher: "Crown Publishing Group",
    featured: true,
    reviewCount: 0,
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    description:
      "A thriller novel about the mysterious disappearance of Amy Dunne and the investigation that follows. The story is told from the alternating perspectives of Nick Dunne and his wife Amy, revealing dark secrets about their marriage.",
    coverImage:
      "https://m.media-amazon.com/images/I/71FZo7-3BnL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Thriller", "Mystery", "Crime Fiction"],
    publicationYear: 2012,
    publisher: "Crown Publishing Group",
    featured: false,
    reviewCount: 0,
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    await Book.insertMany(books);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
