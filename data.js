/* =========================================================================
   READER GOOSE — quiz data
   -------------------------------------------------------------------------
   This is the only file you need to edit to change questions, reader types
   or book lists. Keep the punctuation (commas, quotes, brackets) intact.

   - QUESTIONS: wording from the PHHS English faculty quiz. Each answer has a
     `type` that matches one of the READER_TYPES ids below (the scoring key).
   - READER_TYPES: one per PHHS library fiction label.
   - books: { title, author, cover (file name in the covers/ folder, without
     .webp; leave it out to show a plain tile), shelf (library sub-label),
     age, aus (true if Australian author), blurb }
   ========================================================================= */

const QUESTIONS = [
  {
    q: "What types of books or stories have you enjoyed in the past?",
    goose: "reading-lamp",
    options: [
      { text: "Fast stories with action, danger, survival, or competition", type: "action" },
      { text: "Spooky, creepy, or mystery stories with secrets to solve", type: "scares" },
      { text: "Real-life stories about friends, family, school, or identity", type: "relationships" },
      { text: "Stories with magic, strange creatures, or made-up worlds", type: "magical" },
      { text: "Graphic novels, manga, anime, or stories with lots of pictures", type: "graphics" }
    ]
  },
  {
    q: "What movies or TV shows do you like to watch?",
    goose: "golden",
    options: [
      { text: "Funny shows, comedies, or anything that makes me laugh", type: "laugh" },
      { text: "Stories set in the past, war movies, or movies about real people", type: "timetravel" },
      { text: "Documentaries or videos about science, gaming, technology, or facts", type: "thinktank" },
      { text: "Movies or shows set in Australia, or about Australian life", type: "aussie" },
      { text: "Short, easy-to-follow shows that are simple to get into", type: "light" }
    ]
  },
  {
    q: "What kind of holiday would you most like to go on?",
    goose: "world",
    options: [
      { text: "An adventure holiday with hiking, climbing, racing, or survival challenges", type: "action" },
      { text: "A holiday to old cities, castles, ruins, or famous historical places", type: "timetravel" },
      { text: "A trip around Australia — beach, bush, outback, or road trip", type: "aussie" },
      { text: "A holiday with friends where you meet people and make memories", type: "relationships" },
      { text: "A magical place with hidden worlds, strange creatures, or mystery doors", type: "magical" }
    ]
  },
  {
    q: "If you could have any animal or creature as a sidekick, what would you choose?",
    goose: "dragon-rider",
    options: [
      { text: "A dragon, phoenix, or another magical creature", type: "magical" },
      { text: "A clever dog that helps solve mysteries", type: "scares" },
      { text: "A silly pet that always makes people laugh", type: "laugh" },
      { text: "A robot pet or smart machine helper", type: "thinktank" },
      { text: "An Australian animal sidekick, like a kangaroo or kelpie", type: "aussie" }
    ]
  },
  {
    q: "If you had a superpower, what would it be?",
    goose: "super",
    options: [
      { text: "Super speed, super strength, or the power to survive anything", type: "action" },
      { text: "The power to understand people and help with their problems", type: "relationships" },
      { text: "Magic powers or the ability to talk to animals", type: "magical" },
      { text: "The power to instantly understand science, coding, or how things work", type: "thinktank" },
      { text: "The power to bring drawings or comics to life", type: "graphics" }
    ]
  },
  {
    q: "What do you like to do on the weekend?",
    goose: "soccer",
    options: [
      { text: "Watch funny clips, joke around, or do things that make me laugh", type: "laugh" },
      { text: "Play sport, explore, compete, or do something active", type: "action" },
      { text: "Game, code, build things, or solve puzzles", type: "thinktank" },
      { text: "Draw, read comics, watch anime, or create characters", type: "graphics" },
      { text: "Relax with something short, easy, and not too full-on", type: "light" }
    ]
  },
  {
    q: "What sounds most fun?",
    goose: "explorer",
    options: [
      { text: "Solving a creepy mystery in an old house", type: "scares" },
      { text: "Helping a friend through a big problem", type: "relationships" },
      { text: "Going on a road trip around Australia", type: "aussie" },
      { text: "Travelling back in time for a day", type: "timetravel" },
      { text: "Finding a secret door to another world", type: "magical" }
    ]
  },
  {
    q: "What would you rather watch after school?",
    goose: "reading-grass",
    options: [
      { text: "An anime or comic-style show", type: "graphics" },
      { text: "A comedy or sitcom", type: "laugh" },
      { text: "An action movie, sport movie, or survival story", type: "action" },
      { text: "A documentary or YouTube video about science, gaming, or real facts", type: "thinktank" },
      { text: "Something short and easy to get into", type: "light" }
    ]
  },
  {
    q: "If you could be in a movie, what would it be?",
    goose: "painting",
    options: [
      { text: "A movie set in the past, or about a real person’s life", type: "timetravel" },
      { text: "A thriller where you solve what happened or escape something scary", type: "scares" },
      { text: "A movie set in Australia — city, coast, country, or outback", type: "aussie" },
      { text: "A real-life story about school, family, friendship, or identity", type: "relationships" },
      { text: "A simple, easy-to-follow movie with a clear story", type: "light" }
    ]
  },
  {
    q: "Which one would you choose first from the library?",
    goose: "winter",
    options: [
      { text: "A mystery, suspense, crime, or scary story", type: "scares" },
      { text: "A funny book", type: "laugh" },
      { text: "A story from the past, or a biography", type: "timetravel" },
      { text: "A graphic novel, manga, or anime-style book", type: "graphics" },
      { text: "A shorter, easier book to get into", type: "light" }
    ]
  }
];

/* If two reader types tie, the one picked in the question that comes first in
   this list wins (Q10 = the library question, the most direct signal). */
const TIE_BREAK_QUESTION_ORDER = [9, 0, 7, 5, 1, 2, 3, 4, 6, 8];

const NONFICTION_LABELS = {
  "earth-and-beyond": "Earth and Beyond",
  "curious-creatures": "Curious Creatures",
  "feel-it-live-it": "Feel It, Live It",
  "get-creative": "Get Creative",
  "many-countries-many-ways": "Many Countries, Many Ways",
  "time-machine": "Time Machine",
  "marvellous-machines": "Marvellous Machines"
};

const READER_TYPES = {
  action: {
    label: "Action Packed",
    labelImg: "action-packed",
    name: "The Daredevil Goose",
    tagline: "Fast pages, high stakes, no time to sit still.",
    colour: "#8a3ea6",
    goose: "explorer",
    gallery: ["motorbike", "pirate", "dystopia", "soccer"],
    scene: "parachute-scene",
    about: "You read the way you'd ride a rollercoaster — hanging on to see what happens next. You like heroes who get thrown into danger and have to think fast, whether that's surviving in the wild, winning the big game, or escaping a world that's gone wrong.",
    traits: ["Loves cliffhanger chapter endings", "Cheers for underdogs and survivors", "Gets bored if nothing happens for too long"],
    shelves: ["Adventures", "Science Fiction", "Sport Fiction", "Dystopian"],
    nonfiction: ["marvellous-machines", "feel-it-live-it"],
    books: [
      { title: "Hatchet", author: "Gary Paulsen", cover: "hatchet", shelf: "Adventures", age: "11+", blurb: "A plane crash leaves Brian alone in the Canadian wilderness with nothing but a hatchet." },
      { title: "Stormbreaker (Alex Rider #1)", author: "Anthony Horowitz", cover: "stormbreaker", shelf: "Adventures", age: "11+", blurb: "A 14-year-old is recruited by MI6 and sent undercover. Gadgets, chases and a lot of danger." },
      { title: "Tomorrow, When the War Began", author: "John Marsden", cover: "tomorrow-when-the-war-began", shelf: "Adventures", age: "13+", aus: true, blurb: "Seven teens come back from a bush camping trip to find Australia has been invaded." },
      { title: "Specky Magee", author: "Felice Arena & Garry Lyon", shelf: "Sport Fiction", age: "10+", aus: true, blurb: "Footy-mad Specky dreams of the AFL — then a family secret turns his world upside down." },
      { title: "The Crossover", author: "Kwame Alexander", cover: "the-crossover", shelf: "Sport Fiction", age: "11+", blurb: "Twin brothers, basketball and family, told in fast, punchy verse that reads like a game." },
      { title: "Mortal Engines", author: "Philip Reeve", cover: "mortal-engines", shelf: "Science Fiction", age: "12+", blurb: "In the far future, whole cities roll across the earth on giant wheels — and hunt each other." },
      { title: "The Hunger Games", author: "Suzanne Collins", cover: "the-hunger-games", shelf: "Dystopian", age: "13+", blurb: "Katniss volunteers to take her sister's place in a televised fight for survival." },
      { title: "The Maze Runner", author: "James Dashner", cover: "the-maze-runner", shelf: "Dystopian", age: "12+", blurb: "Thomas wakes up in a lift with no memory, inside a maze that changes every night." },
      { title: "Holes", author: "Louis Sachar", cover: "holes", shelf: "Adventures", age: "10+", blurb: "Stanley is sent to a desert camp where boys dig holes all day. What is the warden really looking for?" },
      { title: "Booked", author: "Kwame Alexander", cover: "booked", shelf: "Sport Fiction", age: "11+", blurb: "Nick lives for soccer, but his family is falling apart. A fast novel in verse about both." },
      { title: "Uglies", author: "Scott Westerfeld", cover: "uglies", shelf: "Dystopian", age: "12+", blurb: "At sixteen, everyone gets an operation to become 'pretty'. Tally can't wait, until her friend runs away." },
      { title: "Divergent", author: "Veronica Roth", cover: "divergent", shelf: "Dystopian", age: "13+", blurb: "In a city split into five factions, Tris hides a dangerous secret: she doesn't fit into any of them." },
      { title: "Ender's Game", author: "Orson Scott Card", cover: "enders-game", shelf: "Science Fiction", age: "13+", blurb: "Child genius Ender is trained in zero-gravity battle games to lead the fight against an alien invasion." },
      { title: "The Recruit (CHERUB #1)", author: "Robert Muchamore", cover: "the-recruit", shelf: "Adventures", age: "13+", blurb: "Orphan James is recruited by CHERUB, a secret agency that trains teenagers as spies." },
      { title: "The Sky So Heavy", author: "Claire Zorn", cover: "the-sky-so-heavy", shelf: "Dystopian", age: "13+", aus: true, blurb: "A nuclear winter blankets the Blue Mountains, and Fin has to keep his little brother alive." },
      { title: "Deadly, Unna?", author: "Phillip Gwynne", cover: "deadly-unna", shelf: "Sport Fiction", age: "14+", aus: true, blurb: "Footy, friendship and racism in a small South Australian coastal town." },
      { title: "Scythe", author: "Neal Shusterman", cover: "scythe", shelf: "Dystopian", age: "14+", blurb: "In a world where no one dies of natural causes, two teens are trained to be the ones who end lives." },
      { title: "Illuminae", author: "Amie Kaufman & Jay Kristoff", cover: "illuminae", shelf: "Science Fiction", age: "14+", aus: true, blurb: "Told through hacked files and messages: two exes on the run across space after their planet is attacked." }
    ]
  },

  scares: {
    label: "Scares and Dares",
    labelImg: "scares-and-dares",
    name: "The Spooky Sleuth",
    tagline: "Creaky doors, cold cases and clues in the dark.",
    colour: "#4b3a7a",
    goose: "frankenstein",
    gallery: ["ghost", "mummy", "bug"],
    scene: "frankenstein-ghost-scene",
    about: "You like a story that gives you goosebumps (sorry). Whether it's a haunted house, a locked-room mystery or a crime that doesn't add up, you love collecting clues and trying to work it out before the characters do.",
    traits: ["Tries to guess the twist early", "Reads with the lights on… mostly", "Notices the tiny details others miss"],
    shelves: ["Horror", "Mystery", "Mystery and Suspense", "Crime", "Choose Your Own"],
    nonfiction: ["many-countries-many-ways"],
    books: [
      { title: "Coraline", author: "Neil Gaiman", cover: "coraline", shelf: "Horror", age: "10+", blurb: "Behind a bricked-up door, Coraline finds a 'better' family — with buttons for eyes." },
      { title: "Small Spaces", author: "Katherine Arden", shelf: "Horror", age: "10+", blurb: "A school trip to a farm goes very wrong when the scarecrows start to move." },
      { title: "The Graveyard Book", author: "Neil Gaiman", cover: "the-graveyard-book", shelf: "Horror", age: "11+", blurb: "A boy is raised by ghosts in a graveyard — while the man who hunts him waits outside." },
      { title: "The Screaming Staircase (Lockwood & Co.)", author: "Jonathan Stroud", cover: "the-screaming-staircase", shelf: "Mystery and Suspense", age: "11+", blurb: "Teen ghost-hunters take on a seriously haunted house. Spooky and funny at once." },
      { title: "Murder Most Unladylike", author: "Robin Stevens", shelf: "Mystery", age: "10+", blurb: "Two boarding-school friends start a secret detective club — then find a real body." },
      { title: "The London Eye Mystery", author: "Siobhan Dowd", cover: "the-london-eye-mystery", shelf: "Mystery", age: "10+", blurb: "Their cousin gets on the London Eye and never gets off. Ted's unusual brain is the key." },
      { title: "Choose Your Own Adventure: The Abominable Snowman", author: "R. A. Montgomery", shelf: "Choose Your Own", age: "9+", blurb: "You make the choices — and some of them lead to a very cold ending." },
      { title: "Night of the Living Dummy (Goosebumps)", author: "R. L. Stine", cover: "night-of-the-living-dummy", shelf: "Horror", age: "9+", blurb: "Twins find a ventriloquist's dummy in a skip. Then strange things start happening at night." },
      { title: "Took", author: "Mary Downing Hahn", cover: "took", shelf: "Horror", age: "10+", blurb: "When Daniel's little sister vanishes into the woods, the local legend of Old Auntie suddenly seems real." },
      { title: "The Westing Game", author: "Ellen Raskin", cover: "the-westing-game", shelf: "Mystery", age: "10+", blurb: "Sixteen heirs race to solve a millionaire's puzzle of a will. Whoever cracks it wins everything." },
      { title: "The House with a Clock in Its Walls", author: "John Bellairs", cover: "the-house-with-a-clock-in-its-walls", shelf: "Horror", age: "10+", blurb: "Lewis moves in with his warlock uncle, in an old house where something is ticking inside the walls." },
      { title: "Skulduggery Pleasant", author: "Derek Landy", cover: "skulduggery-pleasant", shelf: "Mystery and Suspense", age: "11+", blurb: "After her uncle dies, Stephanie teams up with a wisecracking skeleton detective." },
      { title: "Truly Devious", author: "Maureen Johnson", cover: "truly-devious", shelf: "Mystery", age: "13+", blurb: "Stevie joins an elite boarding school determined to solve its famous unsolved kidnapping." },
      { title: "One of Us Is Lying", author: "Karen M. McManus", cover: "one-of-us-is-lying", shelf: "Crime", age: "14+", blurb: "Five students walk into detention. Only four walk out alive, and they're all suspects." },
      { title: "Ghost Bird", author: "Lisa Fuller", cover: "ghost-bird", shelf: "Mystery and Suspense", age: "14+", aus: true, blurb: "When her twin goes missing, Stacey has to face family secrets and the spirit world in her Queensland town." },
      { title: "A Good Girl's Guide to Murder", author: "Holly Jackson", cover: "a-good-girls-guide-to-murder", shelf: "Crime", age: "15+", blurb: "For a school project, Pip reopens a five-year-old murder case that everyone thinks is solved." }
    ]
  },

  laugh: {
    label: "Let’s Laugh",
    labelImg: "lets-laugh",
    name: "The Class Clown",
    tagline: "If it doesn't make you snort, what's the point?",
    colour: "#3aa58f",
    goose: "clown",
    gallery: ["guitar", "harajuku", "bbq"],
    scene: null,
    about: "Reading should be fun, and you know it. You love silly situations, cringe moments, ridiculous characters and stories that make you laugh out loud on the bus. A funny book can still have a big heart, and those are your favourites.",
    traits: ["Reads the best bits out loud to friends", "Loves cartoons in the margins", "Remembers every joke"],
    shelves: ["Humorous", "Jokes"],
    nonfiction: ["get-creative"],
    books: [
      { title: "Diary of a Wimpy Kid", author: "Jeff Kinney", cover: "diary-of-a-wimpy-kid", shelf: "Humorous", age: "9+", blurb: "Greg Heffley's very honest (and very unwise) diary of surviving middle school." },
      { title: "Unreal!", author: "Paul Jennings", cover: "unreal", shelf: "Humorous", age: "9+", aus: true, blurb: "Short, weird, hilarious stories with twists you won't see coming." },
      { title: "Just Annoying!", author: "Andy Griffiths", cover: "just-annoying", shelf: "Humorous", age: "9+", aus: true, blurb: "Andy tries to annoy everyone in his life. He is very, very good at it." },
      { title: "Funny Kid for President", author: "Matt Stanton", shelf: "Humorous", age: "9+", aus: true, blurb: "Max wants to be the funniest kid in the world — and now he's running for class president." },
      { title: "The Brilliant World of Tom Gates", author: "Liz Pichon", cover: "the-brilliant-world-of-tom-gates", shelf: "Humorous", age: "9+", blurb: "Doodles, excuses and a band called DOGZOMBIES. Half book, half sketchbook." },
      { title: "Middle School: The Worst Years of My Life", author: "James Patterson & Chris Tebbetts", shelf: "Humorous", age: "10+", blurb: "Rafe's plan: break every rule in the school handbook. What could go wrong?" },
      { title: "Dork Diaries", author: "Rachel Renée Russell", cover: "dork-diaries", shelf: "Humorous", age: "9+", blurb: "Nikki starts at a new school and records every awkward moment in her diary." },
      { title: "The 13-Storey Treehouse", author: "Andy Griffiths", cover: "the-13-storey-treehouse", shelf: "Humorous", age: "8+", aus: true, blurb: "Andy and Terry live in a treehouse with a bowling alley, a shark tank and a lemonade fountain." },
      { title: "Weirdo", author: "Anh Do", cover: "weirdo", shelf: "Humorous", age: "8+", aus: true, blurb: "Weir Do is the new kid at school. With a name like that, what could possibly go wrong?" },
      { title: "Laugh-Out-Loud Jokes for Kids", author: "Rob Elliott", cover: "laugh-out-loud-jokes-for-kids", shelf: "Jokes", age: "8+", blurb: "Hundreds of jokes, riddles and puns to try out on your friends (and your teachers)." },
      { title: "Big Nate: In a Class by Himself", author: "Lincoln Peirce", cover: "big-nate-in-a-class-by-himself", shelf: "Humorous", age: "9+", blurb: "A fortune cookie says Nate will 'surpass all others' today. School has other ideas." },
      { title: "Timmy Failure: Mistakes Were Made", author: "Stephan Pastis", cover: "timmy-failure-mistakes-were-made", shelf: "Humorous", age: "9+", blurb: "Timmy runs the best detective agency in town. Well, he thinks he does. His partner is a polar bear." },
      { title: "The Terrible Two", author: "Mac Barnett & Jory John", cover: "the-terrible-two", shelf: "Humorous", age: "9+", blurb: "Miles was the best prankster at his old school. At his new one, someone is even better." },
      { title: "I Funny", author: "James Patterson & Chris Grabenstein", shelf: "Humorous", age: "10+", blurb: "Jamie Grimm wants to be the funniest kid on the planet, and his wheelchair isn't going to stop him." },
      { title: "Misery Guts", author: "Morris Gleitzman", cover: "misery-guts", shelf: "Humorous", age: "10+", aus: true, blurb: "Keith is determined to cheer up his gloomy parents, even if it means moving them from London to Queensland." },
      { title: "Two Weeks with the Queen", author: "Morris Gleitzman", cover: "two-weeks-with-the-queen", shelf: "Humorous", age: "11+", aus: true, blurb: "Colin's brother is sick, so Colin decides the only person who can help is the Queen. Funny and sad at once." },
      { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", cover: "the-hitchhikers-guide-to-the-galaxy", shelf: "Humorous", age: "13+", blurb: "Seconds before Earth is demolished to make way for a space highway, Arthur Dent is rescued by an alien friend." },
      { title: "The Secret Diary of Adrian Mole, Aged 13¾", author: "Sue Townsend", shelf: "Humorous", age: "14+", blurb: "Adrian is an intellectual, a misunderstood poet and the owner of a very embarrassing family." }
    ]
  },

  relationships: {
    label: "Relationships and Identity",
    labelImg: "relationships-and-identity",
    name: "The Heart Reader",
    tagline: "Real people, real feelings, real stories.",
    colour: "#d9714f",
    goose: "in-love",
    gallery: ["pride", "anime", "knitting", "yoga"],
    scene: "park-bench-scene",
    about: "You like stories that feel true. Friendships that fall apart and get fixed, families that are complicated, working out who you are and where you fit. You notice how characters feel, and you often end up caring about them like they're real people.",
    traits: ["Feels everything the characters feel", "Gives great advice to friends", "Likes endings that stay with you"],
    shelves: ["Family and Friendships", "School Fiction", "Diary Stories", "Love"],
    nonfiction: ["feel-it-live-it"],
    books: [
      { title: "Wonder", author: "R. J. Palacio", cover: "wonder", shelf: "School Fiction", age: "10+", blurb: "Auggie starts school for the first time, and everyone has to decide how to treat him." },
      { title: "Fish in a Tree", author: "Lynda Mullaly Hunt", cover: "fish-in-a-tree", shelf: "School Fiction", age: "10+", blurb: "Ally has spent years hiding that she can't read. A new teacher sees what she's really capable of." },
      { title: "Lenny’s Book of Everything", author: "Karen Foxlee", cover: "lennys-book-of-everything", shelf: "Family and Friendships", age: "11+", aus: true, blurb: "Cee and her little brother Lenny, who won't stop growing, and the encyclopedia they love." },
      { title: "Tiger Daughter", author: "Rebecca Lim", cover: "tiger-daughter", shelf: "Family and Friendships", age: "11+", aus: true, blurb: "Wen and her friend Henry plan their escape from strict homes and a hard life in Melbourne." },
      { title: "Front Desk", author: "Kelly Yang", cover: "front-desk", shelf: "Family and Friendships", age: "10+", blurb: "Ten-year-old Mia runs a motel front desk while her immigrant family hides guests in need." },
      { title: "Out of My Mind", author: "Sharon M. Draper", cover: "out-of-my-mind", shelf: "Family and Friendships", age: "10+", blurb: "Melody is the smartest kid in her school, but no one knows it because she can't speak." },
      { title: "Heartstopper: Volume 1", author: "Alice Oseman", cover: "heartstopper-volume-1", shelf: "Love", age: "12+", blurb: "Charlie and Nick meet at school and become friends, then maybe more. A gentle LGBTQ+ love story in comic form." },
      { title: "The Thing About Jellyfish", author: "Ali Benjamin", cover: "the-thing-about-jellyfish", shelf: "Diary Stories", age: "11+", blurb: "After her friend dies, Suzy is sure a jellyfish sting was the cause, and sets out to prove it." },
      { title: "Bridge to Terabithia", author: "Katherine Paterson", cover: "bridge-to-terabithia", shelf: "Family and Friendships", age: "10+", blurb: "Jess and Leslie create a secret kingdom in the woods, a friendship that changes Jess forever." },
      { title: "Freak the Mighty", author: "Rodman Philbrick", cover: "freak-the-mighty", shelf: "Family and Friendships", age: "10+", blurb: "Max is big and slow; Kevin is small and brilliant. Together they become Freak the Mighty." },
      { title: "Restart", author: "Gordon Korman", cover: "restart", shelf: "School Fiction", age: "10+", blurb: "After a fall wipes his memory, school bully Chase has to work out who he used to be, and who he wants to be." },
      { title: "Bindi", author: "Kirli Saunders", shelf: "Family and Friendships", age: "10+", aus: true, blurb: "A verse novel about Bindi, her family, her Country and the summer the bushfires come." },
      { title: "The Year the Maps Changed", author: "Danielle Binks", cover: "the-year-the-maps-changed", shelf: "Family and Friendships", age: "11+", aus: true, blurb: "In 1999, Fred's family is changing, and refugees from Kosovo arrive near her home on the Mornington Peninsula." },
      { title: "The Princess Diaries", author: "Meg Cabot", cover: "the-princess-diaries", shelf: "Diary Stories", age: "12+", blurb: "Mia is a normal New York teenager, until she finds out she's the heir to a European throne." },
      { title: "The Outsiders", author: "S. E. Hinton", cover: "the-outsiders", shelf: "Family and Friendships", age: "13+", blurb: "Ponyboy and his Greaser brothers are always at war with the rich Socs, until one night goes too far." },
      { title: "To All the Boys I've Loved Before", author: "Jenny Han", cover: "to-all-the-boys-ive-loved-before", shelf: "Love", age: "13+", blurb: "Lara Jean's secret love letters were never meant to be sent. Then someone mails them." },
      { title: "Looking for Alibrandi", author: "Melina Marchetta", cover: "looking-for-alibrandi", shelf: "Family and Friendships", age: "14+", aus: true, blurb: "Josie's final year of school in Sydney: family secrets, first love and working out who she is." },
      { title: "The Fault in Our Stars", author: "John Green", cover: "the-fault-in-our-stars", shelf: "Love", age: "14+", blurb: "Hazel and Augustus meet at a cancer support group, and fall for each other. Funny, sad and honest." }
    ]
  },

  magical: {
    label: "Magical Worlds",
    labelImg: "magical-worlds",
    name: "The Dragon Rider",
    tagline: "Hidden doors, wild magic and creatures with opinions.",
    colour: "#2f8fc7",
    goose: "wizard",
    gallery: ["dragon-rider", "knight", "dinosaur"],
    scene: "dragon-scene",
    altScene: "wizard-scene",
    about: "Why read about this world when you could visit a hundred others? You love maps at the front of books, magic systems with rules, and animals who are more than they seem. Give you a quest and a sidekick and you're happy for 500 pages.",
    traits: ["Has picked their wizard school house", "Loves a long series", "Reads the map before chapter one"],
    shelves: ["Fantasy", "Animal Stories"],
    nonfiction: ["curious-creatures", "many-countries-many-ways"],
    books: [
      { title: "Nevermoor: The Trials of Morrigan Crow", author: "Jessica Townsend", cover: "nevermoor-the-trials-of-morrigan-crow", shelf: "Fantasy", age: "10+", aus: true, blurb: "Morrigan is cursed to die on her 11th birthday, until she's whisked away to a magical city." },
      { title: "The Ruins of Gorlan (Ranger’s Apprentice #1)", author: "John Flanagan", cover: "the-ruins-of-gorlan", shelf: "Fantasy", age: "11+", aus: true, blurb: "Will is chosen as apprentice to the mysterious Rangers, the kingdom's secret protectors." },
      { title: "The Lightning Thief (Percy Jackson #1)", author: "Rick Riordan", cover: "the-lightning-thief", shelf: "Fantasy", age: "10+", blurb: "Percy finds out his dad is a Greek god, and he's been accused of stealing Zeus's lightning." },
      { title: "The Dragonet Prophecy (Wings of Fire #1)", author: "Tui T. Sutherland", shelf: "Fantasy", age: "10+", blurb: "Five young dragons are destined to end a war. They're not so sure about it." },
      { title: "Harry Potter and the Philosopher’s Stone", author: "J. K. Rowling", cover: "harry-potter-and-the-philosophers-stone", shelf: "Fantasy", age: "9+", blurb: "The boy who lived gets a letter, and a whole hidden world opens up." },
      { title: "The Girl Who Drank the Moon", author: "Kelly Barnhill", cover: "the-girl-who-drank-the-moon", shelf: "Fantasy", age: "10+", blurb: "A baby left for the witch is fed moonlight by mistake, and grows up full of magic." },
      { title: "Into the Wild (Warriors #1)", author: "Erin Hunter", cover: "into-the-wild", shelf: "Animal Stories", age: "9+", blurb: "A pet cat joins a clan of wild forest cats, with rivalries, battles and prophecies." },
      { title: "The One and Only Ivan", author: "Katherine Applegate", cover: "the-one-and-only-ivan", shelf: "Animal Stories", age: "9+", blurb: "A gorilla living in a shopping mall decides to change his life, and a baby elephant's." },
      { title: "Rowan of Rin", author: "Emily Rodda", cover: "rowan-of-rin", shelf: "Fantasy", age: "9+", aus: true, blurb: "Timid Rowan has to join a quest up the forbidden Mountain to save his village's stream." },
      { title: "Artemis Fowl", author: "Eoin Colfer", cover: "artemis-fowl", shelf: "Fantasy", age: "10+", blurb: "A 12-year-old criminal mastermind kidnaps a fairy for ransom. The fairies fight back." },
      { title: "The Wolf Wilder", author: "Katherine Rundell", cover: "the-wolf-wilder", shelf: "Animal Stories", age: "10+", blurb: "In snowy Russia, Feo and her mother teach tame wolves to be wild again, until the army arrives." },
      { title: "The Hobbit", author: "J. R. R. Tolkien", cover: "the-hobbit", shelf: "Fantasy", age: "11+", blurb: "Bilbo Baggins just wants a quiet life. Instead he's off with thirteen dwarves to steal from a dragon." },
      { title: "Eragon", author: "Christopher Paolini", cover: "eragon", shelf: "Fantasy", age: "12+", blurb: "A farm boy finds a blue stone in the mountains. It hatches into a dragon, and his life changes forever." },
      { title: "Northern Lights (His Dark Materials #1)", author: "Philip Pullman", shelf: "Fantasy", age: "12+", blurb: "Lyra and her dæmon travel to the frozen North to rescue her friend from a mysterious organisation." },
      { title: "A Monster Calls", author: "Patrick Ness", cover: "a-monster-calls", shelf: "Fantasy", age: "12+", blurb: "While his mum is seriously ill, Conor is visited by an ancient monster that wants the truth." },
      { title: "Watership Down", author: "Richard Adams", shelf: "Animal Stories", age: "12+", blurb: "A band of rabbits flees their doomed warren on a dangerous journey to find a new home." },
      { title: "Six of Crows", author: "Leigh Bardugo", cover: "six-of-crows", shelf: "Fantasy", age: "14+", blurb: "Six dangerous outcasts. One impossible heist. Kaz Brekker's crew could be rich, or dead." }
    ]
  },

  timetravel: {
    label: "Turn Back Time",
    labelImg: "turn-back-time",
    name: "The Time Traveller",
    tagline: "Real history, real people, real courage.",
    colour: "#6f7d3f",
    goose: "egyptian",
    gallery: ["viking", "knight", "pirate", "mummy"],
    scene: "egyptian-scene",
    altScene: "victorian-scene",
    about: "You're curious about what it was really like back then: in the trenches, in ancient Egypt, or in the life of someone famous. You like stories where ordinary people do brave things, and you love the 'wait, that actually happened?!' moments.",
    traits: ["Asks 'is this a true story?'", "Picks up facts without trying", "Likes imagining how they'd survive"],
    shelves: ["Historical Fiction", "War", "Biographies", "Alternate Histories"],
    nonfiction: ["time-machine"],
    books: [
      { title: "Once", author: "Morris Gleitzman", cover: "once", shelf: "War", age: "12+", aus: true, blurb: "Felix escapes an orphanage in 1942 Poland to find his parents, not understanding the danger around him." },
      { title: "A Rose for the Anzac Boys", author: "Jackie French", shelf: "War", age: "12+", aus: true, blurb: "Three girls run a canteen behind the lines in WWI France and see the war up close." },
      { title: "Soldier Boy", author: "Anthony Hill", cover: "soldier-boy", shelf: "War", age: "11+", aus: true, blurb: "The true story of Jim Martin, who lied about his age and went to Gallipoli at 14." },
      { title: "War Horse", author: "Michael Morpurgo", cover: "war-horse", shelf: "Historical Fiction", age: "10+", blurb: "WWI told through the eyes of Joey, a farm horse sent to the front." },
      { title: "Number the Stars", author: "Lois Lowry", cover: "number-the-stars", shelf: "Historical Fiction", age: "10+", blurb: "In occupied Denmark, Annemarie's family risks everything to hide her Jewish best friend." },
      { title: "I Am Malala (Young Readers Edition)", author: "Malala Yousafzai", cover: "i-am-malala", shelf: "Biographies", age: "11+", blurb: "The girl who stood up for her right to go to school, and changed the world." },
      { title: "Boy: Tales of Childhood", author: "Roald Dahl", cover: "boy-tales-of-childhood", shelf: "Biographies", age: "9+", blurb: "The true (and very Dahl) stories of Roald's school days, sweet shops and strict headmasters." },
      { title: "Leviathan", author: "Scott Westerfeld", cover: "leviathan", shelf: "Alternate Histories", age: "12+", blurb: "WWI, but with giant walking machines versus flying living airships. History, remixed." },
      { title: "My Place", author: "Nadia Wheatley & Donna Rawlins", cover: "my-place", shelf: "Historical Fiction", age: "9+", aus: true, blurb: "One patch of Sydney, told by a different child every ten years, going back to before 1788." },
      { title: "Hitler's Daughter", author: "Jackie French", cover: "hitlers-daughter", shelf: "War", age: "10+", aus: true, blurb: "Waiting for the school bus, Anna tells a story about Hitler's secret daughter. Mark can't stop thinking about it." },
      { title: "Goodnight Mister Tom", author: "Michelle Magorian", cover: "goodnight-mister-tom", shelf: "War", age: "11+", blurb: "In 1939, evacuee William is sent to live with grumpy old Tom in the English countryside." },
      { title: "Refugee", author: "Alan Gratz", cover: "refugee", shelf: "Historical Fiction", age: "11+", blurb: "Three children in three different times (1939, 1994 and 2015), all searching for safety." },
      { title: "Nanberry: Black Brother White", author: "Jackie French", shelf: "Historical Fiction", age: "11+", aus: true, blurb: "The early years of the Sydney colony, through the eyes of an Aboriginal boy raised by the colony's surgeon." },
      { title: "It's Trevor Noah: Born a Crime", author: "Trevor Noah", cover: "its-trevor-noah-born-a-crime", shelf: "Biographies", age: "12+", blurb: "Growing up in apartheid South Africa, where Trevor's very existence was against the law. Adapted for young readers." },
      { title: "The Diary of a Young Girl", author: "Anne Frank", cover: "the-diary-of-a-young-girl", shelf: "Biographies", age: "12+", blurb: "The real diary Anne kept while hiding from the Nazis in Amsterdam, 1942 to 1944." },
      { title: "The Book Thief", author: "Markus Zusak", cover: "the-book-thief", shelf: "War", age: "14+", aus: true, blurb: "Nazi Germany, narrated by Death: a girl who steals books, and the Jewish man hidden in her basement." },
      { title: "Wolf by Wolf", author: "Ryan Graudin", cover: "wolf-by-wolf", shelf: "Alternate Histories", age: "14+", blurb: "The Axis powers won the war. Yael, who can change her face, enters a motorcycle race to get close to Hitler." }
    ]
  },

  graphics: {
    label: "Great Graphics",
    labelImg: "great-graphics",
    name: "The Panel Hopper",
    tagline: "A picture is worth a thousand words — so why not both?",
    colour: "#4f8fd1",
    goose: "anime",
    gallery: ["super", "harajuku", "kimono", "painting"],
    scene: null,
    about: "You're a visual reader. Art, panels, speech bubbles and expressions tell half the story, and you read them all. Manga, graphic novels and anime-style books let you move fast and still go deep. They're real reading, and you're good at it.",
    traits: ["Notices details in the art", "Might draw their own comics", "Reads right-to-left like a pro"],
    shelves: ["Graphic Novels", "Anime"],
    nonfiction: ["get-creative"],
    books: [
      { title: "The Arrival", author: "Shaun Tan", cover: "the-arrival", shelf: "Graphic Novels", age: "10+", aus: true, blurb: "A wordless graphic novel about a migrant arriving in a strange new land. Stunning." },
      { title: "Smile", author: "Raina Telgemeier", cover: "smile", shelf: "Graphic Novels", age: "9+", blurb: "A true story of a fall, a lot of dental drama and surviving middle school friendships." },
      { title: "New Kid", author: "Jerry Craft", cover: "new-kid", shelf: "Graphic Novels", age: "10+", blurb: "Jordan starts at a fancy private school where he's one of the few kids of colour." },
      { title: "El Deafo", author: "Cece Bell", cover: "el-deafo", shelf: "Graphic Novels", age: "9+", blurb: "Cece's hearing aid gives her a 'superpower', and a lot of growing up to do." },
      { title: "Amulet: The Stonekeeper", author: "Kazu Kibuishi", shelf: "Graphic Novels", age: "9+", blurb: "Two kids follow their mum into an underground world of robots and monsters." },
      { title: "Bone: Out from Boneville", author: "Jeff Smith", cover: "bone-out-from-boneville", shelf: "Graphic Novels", age: "9+", blurb: "Three cousins are lost in a valley full of dragons and rat creatures. Funny and epic." },
      { title: "Haikyu!! Vol. 1", author: "Haruichi Furudate", shelf: "Anime", age: "10+", blurb: "A short kid with a huge jump is determined to become a volleyball legend." },
      { title: "My Hero Academia Vol. 1", author: "Kohei Horikoshi", cover: "my-hero-academia-vol-1", shelf: "Anime", age: "12+", blurb: "In a world where almost everyone has a superpower, Deku has none, until he meets his hero." },
      { title: "Dog Man", author: "Dav Pilkey", cover: "dog-man", shelf: "Graphic Novels", age: "8+", blurb: "Part dog, part police officer, all hero. Chaotic, silly and drawn to look like a kid made it." },
      { title: "Hilda and the Troll", author: "Luke Pearson", shelf: "Graphic Novels", age: "8+", blurb: "Fearless Hilda explores the wild hills around her home, full of trolls, giants and strange spirits." },
      { title: "Pokémon Adventures Vol. 1", author: "Hidenori Kusaka", shelf: "Anime", age: "8+", blurb: "Red sets out to become the greatest Pokémon trainer, and runs straight into Team Rocket." },
      { title: "Roller Girl", author: "Victoria Jamieson", cover: "roller-girl", shelf: "Graphic Novels", age: "10+", blurb: "Astrid signs up for roller derby camp. Her best friend doesn't. A summer of bruises and big changes." },
      { title: "The Witch Boy", author: "Molly Knox Ostertag", cover: "the-witch-boy", shelf: "Graphic Novels", age: "10+", blurb: "In Aster's family, girls become witches and boys become shapeshifters. But Aster wants to do magic." },
      { title: "Tales from Outer Suburbia", author: "Shaun Tan", cover: "tales-from-outer-suburbia", shelf: "Graphic Novels", age: "10+", aus: true, blurb: "Short, strange, beautifully illustrated stories about the hidden magic of ordinary suburbs." },
      { title: "Nimona", author: "ND Stevenson", cover: "nimona", shelf: "Graphic Novels", age: "12+", blurb: "A shapeshifting girl becomes sidekick to a supervillain, and turns out to be far more trouble than him." },
      { title: "Ms. Marvel Vol. 1: No Normal", author: "G. Willow Wilson", shelf: "Graphic Novels", age: "12+", blurb: "Kamala Khan, a teenager from New Jersey, suddenly gets superpowers. Being a hero is harder than it looks." },
      { title: "Spy x Family Vol. 1", author: "Tatsuya Endo", cover: "spy-x-family-vol-1", shelf: "Anime", age: "12+", blurb: "A spy needs a fake family for his mission. He doesn't know his wife is an assassin and his daughter reads minds." },
      { title: "Demon Slayer Vol. 1", author: "Koyoharu Gotouge", shelf: "Anime", age: "14+", blurb: "After demons attack his family, Tanjiro trains as a demon slayer to save his sister." },
      { title: "Maus", author: "Art Spiegelman", shelf: "Graphic Novels", age: "14+", blurb: "The author's father's true story of surviving the Holocaust, with Jews drawn as mice and Nazis as cats." }
    ]
  },

  aussie: {
    label: "Australian Stories",
    labelImg: "australian-stories",
    name: "The True Blue Reader",
    tagline: "Stories from our own backyard, and from the people who have been here longest.",
    colour: "#d0662f",
    goose: "atsi",
    gallery: ["bbq", "cork-hat", "train"],
    scene: null,
    about: "You like stories you can picture. Beaches, bush, country towns and city streets that feel like home. You're interested in Australian lives, past and present, including the stories of Aboriginal and Torres Strait Islander peoples, the oldest storytellers in the world.",
    traits: ["Recognises the places in the book", "Loves a good yarn", "Curious about Country and culture"],
    shelves: ["Australian Stories", "Australian Literature", "Aboriginal Literature"],
    nonfiction: ["many-countries-many-ways", "curious-creatures"],
    books: [
      { title: "Black Cockatoo", author: "Carl Merrison & Hakea Hustler", shelf: "Aboriginal Literature", age: "9+", aus: true, blurb: "Mia rescues a black cockatoo, her family's totem, and has to decide what's right." },
      { title: "Sister Heart", author: "Sally Morgan", cover: "sister-heart", shelf: "Aboriginal Literature", age: "11+", aus: true, blurb: "A verse novel about a girl taken from her family, and the friendship that helps her survive." },
      { title: "Young Dark Emu", author: "Bruce Pascoe", shelf: "Aboriginal Literature", age: "10+", aus: true, blurb: "The true history of Aboriginal farming, building and fishing that changes the story of Australia." },
      { title: "Blueback", author: "Tim Winton", cover: "blueback", shelf: "Australian Literature", age: "10+", aus: true, blurb: "Abel's friendship with a giant blue groper, and his fight to protect the bay he loves." },
      { title: "Storm Boy", author: "Colin Thiele", shelf: "Australian Literature", age: "9+", aus: true, blurb: "A boy, his dad and a pelican on the wild Coorong in South Australia. A classic from our own state." },
      { title: "Red Dog", author: "Louis de Bernières", shelf: "Australian Stories", age: "10+", blurb: "The (mostly true) story of a kelpie who roamed the Pilbara and adopted a whole town." },
      { title: "Hating Alison Ashley", author: "Robin Klein", shelf: "Australian Stories", age: "10+", aus: true, blurb: "Erica Yurken's life is ruined when perfect Alison Ashley turns up at her school." },
      { title: "Boy Overboard", author: "Morris Gleitzman", cover: "boy-overboard", shelf: "Australian Stories", age: "10+", aus: true, blurb: "Jamal and his family flee Afghanistan on a dangerous journey to Australia." },
      { title: "The Silver Brumby", author: "Elyne Mitchell", cover: "the-silver-brumby", shelf: "Australian Literature", age: "9+", aus: true, blurb: "Thowra, a rare silver stallion, runs wild in the Snowy Mountains, always one step ahead of the men who hunt him." },
      { title: "Took the Children Away", author: "Archie Roach", shelf: "Aboriginal Literature", age: "9+", aus: true, blurb: "Archie Roach's famous song about the Stolen Generations, as an illustrated book." },
      { title: "Ruby on the Outside", author: "Nova Weetman", shelf: "Australian Stories", age: "10+", aus: true, blurb: "Ruby's mum is in prison, and Ruby is desperate to keep it secret from her new best friend." },
      { title: "Seven Little Australians", author: "Ethel Turner", cover: "seven-little-australians", shelf: "Australian Literature", age: "10+", aus: true, blurb: "Seven naughty Woolcot children run riot in 1890s Sydney. An Aussie classic that's still funny, and sad." },
      { title: "Two Wolves", author: "Tristan Bancks", cover: "two-wolves", shelf: "Australian Stories", age: "11+", aus: true, blurb: "The police knock, and Ben's parents suddenly take the kids on a 'holiday'. Something isn't right." },
      { title: "Follow the Rabbit-Proof Fence", author: "Doris Pilkington Garimara", cover: "follow-the-rabbit-proof-fence", shelf: "Aboriginal Literature", age: "12+", aus: true, blurb: "In 1931, three girls escape a settlement and walk 1,600 kilometres home along the rabbit-proof fence. A true story." },
      { title: "The Bone Sparrow", author: "Zana Fraillon", cover: "the-bone-sparrow", shelf: "Australian Stories", age: "13+", aus: true, blurb: "Subhi was born in an Australian detention centre. Then a girl from outside the fence brings him a story." },
      { title: "Catching Teller Crow", author: "Ambelin & Ezekiel Kwaymullina", cover: "catching-teller-crow", shelf: "Aboriginal Literature", age: "14+", aus: true, blurb: "Beth is a ghost, helping her detective dad solve a mystery in a country town that's hiding dark secrets." }
    ]
  },

  light: {
    label: "Light Reading",
    labelImg: "light-reading",
    name: "The Chill Reader",
    tagline: "Short, sharp and actually finished.",
    colour: "#2e7f8b",
    goose: "reading-grass",
    gallery: ["yoga", "winter", "golden"],
    scene: null,
    about: "You want a book that gets straight into it. No 50-page warm-up, no giant doorstop. Short chapters and clear stories let you enjoy reading without it feeling like a chore. Lots of great readers start right here, and finishing a book feels great.",
    traits: ["Likes short chapters", "Wants the story to start on page one", "Finishes what they start"],
    shelves: ["Easy Readers"],
    nonfiction: ["curious-creatures", "feel-it-live-it"],
    books: [
      { title: "The Bad Guys", author: "Aaron Blabey", cover: "the-bad-guys", shelf: "Easy Readers", age: "8+", aus: true, blurb: "A wolf, a shark, a snake and a piranha try (and fail) to be good guys. Very funny, very quick." },
      { title: "Toad Rage", author: "Morris Gleitzman", cover: "toad-rage", shelf: "Easy Readers", age: "9+", aus: true, blurb: "A cane toad wants humans to like toads. It goes about as well as you'd expect." },
      { title: "Love That Dog", author: "Sharon Creech", shelf: "Easy Readers", age: "9+", blurb: "Jack doesn't want to write poetry, until he does. Short, moving and quick to read." },
      { title: "Ghost (Track #1)", author: "Jason Reynolds", cover: "ghost", shelf: "Easy Readers", age: "10+", blurb: "Ghost has been running from his past, until a coach sees him run for real." },
      { title: "Stuntboy, in the Meantime", author: "Jason Reynolds", cover: "stuntboy-in-the-meantime", shelf: "Easy Readers", age: "8+", blurb: "Portico is secretly a superhero who saves the day, mostly from his own worries." },
      { title: "Kensuke’s Kingdom", author: "Michael Morpurgo", cover: "kensukes-kingdom", shelf: "Easy Readers", age: "9+", blurb: "Washed up on an island, Michael finds he's not alone." },
      { title: "The Iron Man", author: "Ted Hughes", cover: "the-iron-man", shelf: "Easy Readers", age: "8+", blurb: "A giant metal man appears on a cliff top. A short, strange classic." },
      { title: "Fortunately, the Milk", author: "Neil Gaiman", cover: "fortunately-the-milk", shelf: "Easy Readers", age: "8+", blurb: "Dad popped out for milk and came back very late. His excuse involves aliens, pirates and a time machine." },
      { title: "Stone Fox", author: "John Reynolds Gardiner", cover: "stone-fox", shelf: "Easy Readers", age: "8+", blurb: "Willy and his dog Searchlight enter a dog-sled race to save the family farm. A short read that packs a punch." },
      { title: "Frindle", author: "Andrew Clements", cover: "frindle", shelf: "Easy Readers", age: "9+", blurb: "Nick invents a new word for 'pen', just to annoy his teacher. Soon the whole country is using it." },
      { title: "Inside Out & Back Again", author: "Thanhha Lai", cover: "inside-out-back-again", shelf: "Easy Readers", age: "10+", blurb: "A short novel in verse: Hà and her family flee Vietnam in 1975 and start again in Alabama." },
      { title: "Brown Girl Dreaming", author: "Jacqueline Woodson", cover: "brown-girl-dreaming", shelf: "Easy Readers", age: "11+", blurb: "The author's own childhood, told in short, powerful poems." },
      { title: "One", author: "Sarah Crossan", cover: "one", shelf: "Easy Readers", age: "13+", blurb: "Grace and Tippi are conjoined twins starting school for the first time. A quick read in verse." },
      { title: "Long Way Down", author: "Jason Reynolds", cover: "long-way-down", shelf: "Easy Readers", age: "14+", blurb: "One lift ride. Sixty seconds. Will has to decide whether to take revenge for his brother. Told in verse." }
    ]
  },

  thinktank: {
    label: "Think Tank",
    labelImg: "think-tank",
    name: "The Big Brain",
    tagline: "How does it work? What if…? Can I try it?",
    colour: "#c8734a",
    goose: "einstein",
    gallery: ["robot", "astronaut", "bug", "gardener"],
    scene: "space-scene",
    about: "You're a question-asker. You want to know how things work, why the universe is the way it is, and how to build, code or solve something yourself. Facts, puzzles, robots and games are your thing, and you love a story with a clever problem to solve.",
    traits: ["Collects amazing facts", "Loves puzzles and strategy", "Asks 'why?' a lot"],
    shelves: ["Science", "Coding", "Robotics", "Gaming", "Puzzle Books", "Math", "Fact books"],
    nonfiction: ["earth-and-beyond", "marvellous-machines", "curious-creatures"],
    books: [
      { title: "The Wild Robot", author: "Peter Brown", cover: "the-wild-robot", shelf: "Robotics", age: "8+", blurb: "A robot washes up on a wild island and has to learn to survive from the animals." },
      { title: "Escape from Mr. Lemoncello’s Library", author: "Chris Grabenstein", cover: "escape-from-mr-lemoncellos-library", shelf: "Puzzle Books", age: "9+", blurb: "Twelve kids are locked in a high-tech library and have to solve puzzles to get out." },
      { title: "Minecraft: The Island", author: "Max Brooks", cover: "minecraft-the-island", shelf: "Gaming", age: "9+", blurb: "Dropped into a Minecraft world with no instructions. Survive, build, figure it out." },
      { title: "Hidden Figures (Young Readers’ Edition)", author: "Margot Lee Shetterly", cover: "hidden-figures", shelf: "Science", age: "10+", blurb: "The true story of the Black women mathematicians who helped NASA reach space." },
      { title: "The Boy Who Harnessed the Wind (Young Readers)", author: "William Kamkwamba & Bryan Mealer", cover: "the-boy-who-harnessed-the-wind", shelf: "Science", age: "10+", blurb: "During a famine in Malawi, 14-year-old William builds a windmill from scrap." },
      { title: "A Really Short History of Nearly Everything", author: "Bill Bryson", cover: "a-really-short-history-of-nearly-everything", shelf: "Science", age: "10+", blurb: "The universe, atoms, dinosaurs and us, explained with jokes." },
      { title: "The Number Devil", author: "Hans Magnus Enzensberger", shelf: "Math", age: "10+", blurb: "A boy who hates maths is visited in his dreams by a devil who makes numbers magical." },
      { title: "Guinness World Records (latest edition)", author: "Guinness World Records", shelf: "Fact books", age: "All ages", blurb: "The biggest, fastest, weirdest and most amazing. Open it anywhere." },
      { title: "Professor Astro Cat's Frontiers of Space", author: "Dominic Walliman & Ben Newman", shelf: "Science", age: "8+", blurb: "A cat in a spacesuit guides you through stars, planets and black holes." },
      { title: "The Wild Robot Escapes", author: "Peter Brown", cover: "the-wild-robot-escapes", shelf: "Robotics", age: "8+", blurb: "Roz the robot is taken from her island and sent to work on a farm. She has to find her way home." },
      { title: "The Way Things Work Now", author: "David Macaulay", shelf: "Science", age: "9+", blurb: "How everything from zips to smartphones actually works, explained with brilliant drawings (and mammoths)." },
      { title: "The Phantom Tollbooth", author: "Norton Juster", cover: "the-phantom-tollbooth", shelf: "Math", age: "9+", blurb: "Bored Milo drives through a toy tollbooth into a land where words and numbers are at war." },
      { title: "Girls Who Code: Learn to Code and Change the World", author: "Reshma Saujani", cover: "girls-who-code-learn-to-code-and-change-the-world", shelf: "Coding", age: "10+", blurb: "What coding is, how it works, and the people using it to change the world." },
      { title: "Python for Kids", author: "Jason R. Briggs", cover: "python-for-kids", shelf: "Coding", age: "10+", blurb: "Learn to program in Python, one of the world's most popular languages, and build your own games." },
      { title: "The Puzzling World of Winston Breen", author: "Eric Berlin", cover: "the-puzzling-world-of-winston-breen", shelf: "Puzzle Books", age: "10+", blurb: "Winston loves puzzles. Then he finds one that leads to a real hidden treasure. Solve along as you read." },
      { title: "Cosmic", author: "Frank Cottrell-Boyce", cover: "cosmic", shelf: "Science", age: "10+", blurb: "Liam is 12 but looks like an adult, so he pretends to be a dad on a trip, and ends up in space." },
      { title: "Thing Explainer", author: "Randall Munroe", cover: "thing-explainer", shelf: "Science", age: "11+", blurb: "Complicated things like rockets and the human body, explained using only the 1,000 most common words." },
      { title: "What If?", author: "Randall Munroe", cover: "what-if", shelf: "Science", age: "12+", blurb: "Serious science answers to ridiculous questions, like what happens if you throw a baseball at nearly light speed." },
      { title: "Warcross", author: "Marie Lu", cover: "warcross", shelf: "Gaming", age: "13+", blurb: "Teen hacker Emika glitches into the world's biggest video game tournament, and is hired to catch a criminal inside it." }
    ]
  }
};
