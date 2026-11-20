/* =========================================================================
   READER GOOSE — quiz data
   -------------------------------------------------------------------------
   This is the only file you need to edit to change questions, reader types
   or book lists. Keep the punctuation (commas, quotes, brackets) intact.

   - QUESTIONS: wording from the PHHS English faculty quiz. Each answer has a
     `type` that matches one of the READER_TYPES ids below (the scoring key).
   - READER_TYPES: one per PHHS library fiction label.
   - books: { title, author, shelf (library sub-label), age, aus (true if
     Australian author), blurb }
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
      { title: "Hatchet", author: "Gary Paulsen", shelf: "Adventures", age: "11+", blurb: "A plane crash leaves Brian alone in the Canadian wilderness with nothing but a hatchet." },
      { title: "Stormbreaker (Alex Rider #1)", author: "Anthony Horowitz", shelf: "Adventures", age: "11+", blurb: "A 14-year-old is recruited by MI6 and sent undercover. Gadgets, chases and a lot of danger." },
      { title: "Tomorrow, When the War Began", author: "John Marsden", shelf: "Adventures", age: "13+", aus: true, blurb: "Seven teens come back from a bush camping trip to find Australia has been invaded." },
      { title: "Specky Magee", author: "Felice Arena & Garry Lyon", shelf: "Sport Fiction", age: "10+", aus: true, blurb: "Footy-mad Specky dreams of the AFL — then a family secret turns his world upside down." },
      { title: "The Crossover", author: "Kwame Alexander", shelf: "Sport Fiction", age: "11+", blurb: "Twin brothers, basketball and family, told in fast, punchy verse that reads like a game." },
      { title: "Mortal Engines", author: "Philip Reeve", shelf: "Science Fiction", age: "12+", blurb: "In the far future, whole cities roll across the earth on giant wheels — and hunt each other." },
      { title: "The Hunger Games", author: "Suzanne Collins", shelf: "Dystopian", age: "13+", blurb: "Katniss volunteers to take her sister's place in a televised fight for survival." },
      { title: "The Maze Runner", author: "James Dashner", shelf: "Dystopian", age: "12+", blurb: "Thomas wakes up in a lift with no memory, inside a maze that changes every night." }
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
      { title: "Coraline", author: "Neil Gaiman", shelf: "Horror", age: "10+", blurb: "Behind a bricked-up door, Coraline finds a 'better' family — with buttons for eyes." },
      { title: "Small Spaces", author: "Katherine Arden", shelf: "Horror", age: "10+", blurb: "A school trip to a farm goes very wrong when the scarecrows start to move." },
      { title: "The Graveyard Book", author: "Neil Gaiman", shelf: "Horror", age: "11+", blurb: "A boy is raised by ghosts in a graveyard — while the man who hunts him waits outside." },
      { title: "The Screaming Staircase (Lockwood & Co.)", author: "Jonathan Stroud", shelf: "Mystery and Suspense", age: "11+", blurb: "Teen ghost-hunters take on a seriously haunted house. Spooky and funny at once." },
      { title: "Murder Most Unladylike", author: "Robin Stevens", shelf: "Mystery", age: "10+", blurb: "Two boarding-school friends start a secret detective club — then find a real body." },
      { title: "The London Eye Mystery", author: "Siobhan Dowd", shelf: "Mystery", age: "10+", blurb: "Their cousin gets on the London Eye and never gets off. Ted's unusual brain is the key." },
      { title: "Choose Your Own Adventure: The Abominable Snowman", author: "R. A. Montgomery", shelf: "Choose Your Own", age: "9+", blurb: "You make the choices — and some of them lead to a very cold ending." }
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
      { title: "Diary of a Wimpy Kid", author: "Jeff Kinney", shelf: "Humorous", age: "9+", blurb: "Greg Heffley's very honest (and very unwise) diary of surviving middle school." },
      { title: "Unreal!", author: "Paul Jennings", shelf: "Humorous", age: "9+", aus: true, blurb: "Short, weird, hilarious stories with twists you won't see coming." },
      { title: "Just Annoying!", author: "Andy Griffiths", shelf: "Humorous", age: "9+", aus: true, blurb: "Andy tries to annoy everyone in his life. He is very, very good at it." },
      { title: "Funny Kid for President", author: "Matt Stanton", shelf: "Humorous", age: "9+", aus: true, blurb: "Max wants to be the funniest kid in the world — and now he's running for class president." },
      { title: "The Brilliant World of Tom Gates", author: "Liz Pichon", shelf: "Humorous", age: "9+", blurb: "Doodles, excuses and a band called DOGZOMBIES. Half book, half sketchbook." },
      { title: "Middle School: The Worst Years of My Life", author: "James Patterson & Chris Tebbetts", shelf: "Humorous", age: "10+", blurb: "Rafe's plan: break every rule in the school handbook. What could go wrong?" },
      { title: "Dork Diaries", author: "Rachel Renée Russell", shelf: "Humorous", age: "9+", blurb: "Nikki starts at a new school and records every awkward moment in her diary." }
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
      { title: "Wonder", author: "R. J. Palacio", shelf: "School Fiction", age: "10+", blurb: "Auggie starts school for the first time, and everyone has to decide how to treat him." },
      { title: "Fish in a Tree", author: "Lynda Mullaly Hunt", shelf: "School Fiction", age: "10+", blurb: "Ally has spent years hiding that she can't read. A new teacher sees what she's really capable of." },
      { title: "Lenny’s Book of Everything", author: "Karen Foxlee", shelf: "Family and Friendships", age: "11+", aus: true, blurb: "Cee and her little brother Lenny, who won't stop growing, and the encyclopedia they love." },
      { title: "Tiger Daughter", author: "Rebecca Lim", shelf: "Family and Friendships", age: "11+", aus: true, blurb: "Wen and her friend Henry plan their escape from strict homes and a hard life in Melbourne." },
      { title: "Front Desk", author: "Kelly Yang", shelf: "Family and Friendships", age: "10+", blurb: "Ten-year-old Mia runs a motel front desk while her immigrant family hides guests in need." },
      { title: "Out of My Mind", author: "Sharon M. Draper", shelf: "Family and Friendships", age: "10+", blurb: "Melody is the smartest kid in her school, but no one knows it because she can't speak." },
      { title: "Heartstopper: Volume 1", author: "Alice Oseman", shelf: "Love", age: "12+", blurb: "Charlie and Nick meet at school and become friends, then maybe more. A gentle LGBTQ+ love story in comic form." },
      { title: "The Thing About Jellyfish", author: "Ali Benjamin", shelf: "Diary Stories", age: "11+", blurb: "After her friend dies, Suzy is sure a jellyfish sting was the cause, and sets out to prove it." }
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
      { title: "Nevermoor: The Trials of Morrigan Crow", author: "Jessica Townsend", shelf: "Fantasy", age: "10+", aus: true, blurb: "Morrigan is cursed to die on her 11th birthday, until she's whisked away to a magical city." },
      { title: "The Ruins of Gorlan (Ranger’s Apprentice #1)", author: "John Flanagan", shelf: "Fantasy", age: "11+", aus: true, blurb: "Will is chosen as apprentice to the mysterious Rangers, the kingdom's secret protectors." },
      { title: "The Lightning Thief (Percy Jackson #1)", author: "Rick Riordan", shelf: "Fantasy", age: "10+", blurb: "Percy finds out his dad is a Greek god, and he's been accused of stealing Zeus's lightning." },
      { title: "The Dragonet Prophecy (Wings of Fire #1)", author: "Tui T. Sutherland", shelf: "Fantasy", age: "10+", blurb: "Five young dragons are destined to end a war. They're not so sure about it." },
      { title: "Harry Potter and the Philosopher’s Stone", author: "J. K. Rowling", shelf: "Fantasy", age: "9+", blurb: "The boy who lived gets a letter, and a whole hidden world opens up." },
      { title: "The Girl Who Drank the Moon", author: "Kelly Barnhill", shelf: "Fantasy", age: "10+", blurb: "A baby left for the witch is fed moonlight by mistake, and grows up full of magic." },
      { title: "Into the Wild (Warriors #1)", author: "Erin Hunter", shelf: "Animal Stories", age: "9+", blurb: "A pet cat joins a clan of wild forest cats, with rivalries, battles and prophecies." },
      { title: "The One and Only Ivan", author: "Katherine Applegate", shelf: "Animal Stories", age: "9+", blurb: "A gorilla living in a shopping mall decides to change his life, and a baby elephant's." }
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
      { title: "Once", author: "Morris Gleitzman", shelf: "War", age: "12+", aus: true, blurb: "Felix escapes an orphanage in 1942 Poland to find his parents, not understanding the danger around him." },
      { title: "A Rose for the Anzac Boys", author: "Jackie French", shelf: "War", age: "12+", aus: true, blurb: "Three girls run a canteen behind the lines in WWI France and see the war up close." },
      { title: "Soldier Boy", author: "Anthony Hill", shelf: "War", age: "11+", aus: true, blurb: "The true story of Jim Martin, who lied about his age and went to Gallipoli at 14." },
      { title: "War Horse", author: "Michael Morpurgo", shelf: "Historical Fiction", age: "10+", blurb: "WWI told through the eyes of Joey, a farm horse sent to the front." },
      { title: "Number the Stars", author: "Lois Lowry", shelf: "Historical Fiction", age: "10+", blurb: "In occupied Denmark, Annemarie's family risks everything to hide her Jewish best friend." },
      { title: "I Am Malala (Young Readers Edition)", author: "Malala Yousafzai", shelf: "Biographies", age: "11+", blurb: "The girl who stood up for her right to go to school, and changed the world." },
      { title: "Boy: Tales of Childhood", author: "Roald Dahl", shelf: "Biographies", age: "9+", blurb: "The true (and very Dahl) stories of Roald's school days, sweet shops and strict headmasters." },
      { title: "Leviathan", author: "Scott Westerfeld", shelf: "Alternate Histories", age: "12+", blurb: "WWI, but with giant walking machines versus flying living airships. History, remixed." }
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
      { title: "The Arrival", author: "Shaun Tan", shelf: "Graphic Novels", age: "10+", aus: true, blurb: "A wordless graphic novel about a migrant arriving in a strange new land. Stunning." },
      { title: "Smile", author: "Raina Telgemeier", shelf: "Graphic Novels", age: "9+", blurb: "A true story of a fall, a lot of dental drama and surviving middle school friendships." },
      { title: "New Kid", author: "Jerry Craft", shelf: "Graphic Novels", age: "10+", blurb: "Jordan starts at a fancy private school where he's one of the few kids of colour." },
      { title: "El Deafo", author: "Cece Bell", shelf: "Graphic Novels", age: "9+", blurb: "Cece's hearing aid gives her a 'superpower', and a lot of growing up to do." },
      { title: "Amulet: The Stonekeeper", author: "Kazu Kibuishi", shelf: "Graphic Novels", age: "9+", blurb: "Two kids follow their mum into an underground world of robots and monsters." },
      { title: "Bone: Out from Boneville", author: "Jeff Smith", shelf: "Graphic Novels", age: "9+", blurb: "Three cousins are lost in a valley full of dragons and rat creatures. Funny and epic." },
      { title: "Haikyu!! Vol. 1", author: "Haruichi Furudate", shelf: "Anime", age: "10+", blurb: "A short kid with a huge jump is determined to become a volleyball legend." },
      { title: "My Hero Academia Vol. 1", author: "Kohei Horikoshi", shelf: "Anime", age: "12+", blurb: "In a world where almost everyone has a superpower, Deku has none, until he meets his hero." }
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
      { title: "Sister Heart", author: "Sally Morgan", shelf: "Aboriginal Literature", age: "11+", aus: true, blurb: "A verse novel about a girl taken from her family, and the friendship that helps her survive." },
      { title: "Young Dark Emu", author: "Bruce Pascoe", shelf: "Aboriginal Literature", age: "10+", aus: true, blurb: "The true history of Aboriginal farming, building and fishing that changes the story of Australia." },
      { title: "Blueback", author: "Tim Winton", shelf: "Australian Literature", age: "10+", aus: true, blurb: "Abel's friendship with a giant blue groper, and his fight to protect the bay he loves." },
      { title: "Storm Boy", author: "Colin Thiele", shelf: "Australian Literature", age: "9+", aus: true, blurb: "A boy, his dad and a pelican on the wild Coorong in South Australia. A classic from our own state." },
      { title: "Red Dog", author: "Louis de Bernières", shelf: "Australian Stories", age: "10+", blurb: "The (mostly true) story of a kelpie who roamed the Pilbara and adopted a whole town." },
      { title: "Hating Alison Ashley", author: "Robin Klein", shelf: "Australian Stories", age: "10+", aus: true, blurb: "Erica Yurken's life is ruined when perfect Alison Ashley turns up at her school." },
      { title: "Boy Overboard", author: "Morris Gleitzman", shelf: "Australian Stories", age: "10+", aus: true, blurb: "Jamal and his family flee Afghanistan on a dangerous journey to Australia." }
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
      { title: "The Bad Guys", author: "Aaron Blabey", shelf: "Easy Readers", age: "8+", aus: true, blurb: "A wolf, a shark, a snake and a piranha try (and fail) to be good guys. Very funny, very quick." },
      { title: "Toad Rage", author: "Morris Gleitzman", shelf: "Easy Readers", age: "9+", aus: true, blurb: "A cane toad wants humans to like toads. It goes about as well as you'd expect." },
      { title: "Love That Dog", author: "Sharon Creech", shelf: "Easy Readers", age: "9+", blurb: "Jack doesn't want to write poetry, until he does. Short, moving and quick to read." },
      { title: "Ghost (Track #1)", author: "Jason Reynolds", shelf: "Easy Readers", age: "10+", blurb: "Ghost has been running from his past, until a coach sees him run for real." },
      { title: "Stuntboy, in the Meantime", author: "Jason Reynolds", shelf: "Easy Readers", age: "8+", blurb: "Portico is secretly a superhero who saves the day, mostly from his own worries." },
      { title: "Kensuke’s Kingdom", author: "Michael Morpurgo", shelf: "Easy Readers", age: "9+", blurb: "Washed up on an island, Michael finds he's not alone." },
      { title: "The Iron Man", author: "Ted Hughes", shelf: "Easy Readers", age: "8+", blurb: "A giant metal man appears on a cliff top. A short, strange classic." }
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
      { title: "The Wild Robot", author: "Peter Brown", shelf: "Robotics", age: "8+", blurb: "A robot washes up on a wild island and has to learn to survive from the animals." },
      { title: "Escape from Mr. Lemoncello’s Library", author: "Chris Grabenstein", shelf: "Puzzle Books", age: "9+", blurb: "Twelve kids are locked in a high-tech library and have to solve puzzles to get out." },
      { title: "Minecraft: The Island", author: "Max Brooks", shelf: "Gaming", age: "9+", blurb: "Dropped into a Minecraft world with no instructions. Survive, build, figure it out." },
      { title: "Hidden Figures (Young Readers’ Edition)", author: "Margot Lee Shetterly", shelf: "Science", age: "10+", blurb: "The true story of the Black women mathematicians who helped NASA reach space." },
      { title: "The Boy Who Harnessed the Wind (Young Readers)", author: "William Kamkwamba & Bryan Mealer", shelf: "Science", age: "10+", blurb: "During a famine in Malawi, 14-year-old William builds a windmill from scrap." },
      { title: "A Really Short History of Nearly Everything", author: "Bill Bryson", shelf: "Science", age: "10+", blurb: "The universe, atoms, dinosaurs and us, explained with jokes." },
      { title: "The Number Devil", author: "Hans Magnus Enzensberger", shelf: "Math", age: "10+", blurb: "A boy who hates maths is visited in his dreams by a devil who makes numbers magical." },
      { title: "Guinness World Records (latest edition)", author: "Guinness World Records", shelf: "Fact books", age: "All ages", blurb: "The biggest, fastest, weirdest and most amazing. Open it anywhere." }
    ]
  }
};
