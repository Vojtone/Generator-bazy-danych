const nazwyKonferencji = [
    "World of Opportunities",
    "A Whole New World",
    "A Celebration of Success",
    "A Spectrum of Opportunities",
    "Ain’t No Stoppin’ Us Now",
    "All Systems Go",
    "Anything is Possible",
    "Back to the Future",
    "Back On Top",
    "Becoming Agents of Change",
    "Be Extraordinary",
    "Beat (name of biggest competitor)",
    "Better and Consistent",
    "Beyond All Limits",
    "Board Break Experience at the event!",
    "Breakthrough to Excellence",
    "Breaking Barriers",
    "Breaking Down Barriers",
    "Breaking Out of Your Shell",
    "Breakthrough Performance",
    "Breakthrough to Excellence",
    "Building on the Best",
    "Building for the Future",
    "California Dreamin’ (Tie into the location)",
    "Commitment to Excellence",
    "Creating Customer Connections",
    "Creating Connections-Building Bridges… Together",
    "Challenge Yourself",
    "Charting the Course",
    "Customer Focus",
    "Discovering Natural Treasures",
    "Dedicated To Your Success",
    "Develop the Possibilities",
    "Discover the Difference",
    "Do Great Things",
    "Don’t Stop Believing",
    "Facing Forward",
    "Facing the Challenges",
    "Focus on Success",
    "Focus on the Future",
    "Fusing Power and People",
    "Gaining the Edge",
    "Get Momentum",
    "Get Switched On!",
    "Get the Edge",
    "Getting It Done",
    "Getting You Prepared for 201 Good to Great",
    "Got Momentum",
    "Growing your Business",
    "Great Expectations",
    "Guide their Journey: Improving Customer Service",
    "Higher, Faster, Stronger",
    "Historic Proportions",
    "Homecoming 201",
    "It Starts with Us",
    "Igniting Team Spirit"
];

const kraje = [
    {symbol: "AF", nazwa: "Afganistan"},
    {symbol: "AL", nazwa: "Albania"},
    {symbol: "DZ", nazwa: "Algieria"},
    {symbol: "AD", nazwa: "Andora"},
    {symbol: "AO", nazwa: "Angola"},
    {symbol: "AI", nazwa: "Anguilla"},
    {symbol: "AQ", nazwa: "Antarktyda"},
    {symbol: "SA", nazwa: "Arabia-Saudyjska"},
    {symbol: "AR", nazwa: "Argentyna"},
    {symbol: "AM", nazwa: "Armenia"},
    {symbol: "AW", nazwa: "Aruba"},
    {symbol: "AU", nazwa: "Australia"},
    {symbol: "AT", nazwa: "Austria"},
    {symbol: "AZ", nazwa: "Azerbejdżan"},
    {symbol: "BS", nazwa: "Bahamy"},
    {symbol: "BH", nazwa: "Bahrajn"},
    {symbol: "BD", nazwa: "Bangladesz"},
    {symbol: "BB", nazwa: "Barbados"},
    {symbol: "BE", nazwa: "Belgia"},
    {symbol: "BZ", nazwa: "Belize"},
    {symbol: "BJ", nazwa: "Benin"},
    {symbol: "BM", nazwa: "Bermudy"},
    {symbol: "BT", nazwa: "Bhutan"},
    {symbol: "BY", nazwa: "Białoruś"},
    {symbol: "BO", nazwa: "Boliwia"},
    {symbol: "BW", nazwa: "Botswana"},
    {symbol: "BR", nazwa: "Brazylia"},
    {symbol: "BG", nazwa: "Bułgaria"},
    {symbol: "BF", nazwa: "Burkina-Faso"},
    {symbol: "BI", nazwa: "Burundi"},
    {symbol: "XC", nazwa: "Ceuta"},
    {symbol: "CL", nazwa: "Chile"},
    {symbol: "CN", nazwa: "Chiny"},
    {symbol: "CW", nazwa: "Curaçao"},
    {symbol: "HR", nazwa: "Chorwacja"},
    {symbol: "CY", nazwa: "Cypr"},
    {symbol: "TD", nazwa: "Czad"},
    {symbol: "ME", nazwa: "Czarnogóra"},
    {symbol: "DK", nazwa: "Dania"},
    {symbol: "DM", nazwa: "Dominika"},
    {symbol: "DJ", nazwa: "Dżibuti"},
    {symbol: "EG", nazwa: "Egipt"},
    {symbol: "EC", nazwa: "Ekwador"},
    {symbol: "ER", nazwa: "Erytrea"},
    {symbol: "EE", nazwa: "Estonia"},
    {symbol: "ET", nazwa: "Etiopia"},
    {symbol: "FJ", nazwa: "Fidżi"},
    {symbol: "PH", nazwa: "Filipiny"},
    {symbol: "FI", nazwa: "Finlandia"},
    {symbol: "FR", nazwa: "Francja"},
    {symbol: "GA", nazwa: "Gabon"},
    {symbol: "GM", nazwa: "Gambia"},
    {symbol: "GH", nazwa: "Ghana"},
    {symbol: "ES", nazwa: "Hiszpania"},
    {symbol: "HN", nazwa: "Honduras"},
    {symbol: "HK", nazwa: "Hongkong"},
    {symbol: "IN", nazwa: "Indie"},
    {symbol: "ID", nazwa: "Indonezja"},
    {symbol: "IQ", nazwa: "Irak"},
    {symbol: "IR", nazwa: "Iran"},
    {symbol: "CA", nazwa: "Kanada"},
    {symbol: "QA", nazwa: "Katar"},
    {symbol: "KZ", nazwa: "Kazachstan "},
    {symbol: "KE", nazwa: "Kenia"},
    {symbol: "KG", nazwa: "Kirgistan"},
    {symbol: "KI", nazwa: "Kiribati"},
    {symbol: "CO", nazwa: "Kolumbia"},
    {symbol: "KM", nazwa: "Komory"},
    {symbol: "CG", nazwa: "Kongo"},
    {symbol: "LA", nazwa: "Laos"},
    {symbol: "NL", nazwa: "Niderlandy"},
    {symbol: "DE", nazwa: "Niemcy"},
    {symbol: "PL", nazwa: "Polska"},
    {symbol: "PT", nazwa: "Portugalia"},
    {symbol: "CZ", nazwa: "Republika_Czeska"},
    {symbol: "SO", nazwa: "Somalia"},
    {symbol: "LK", nazwa: "SriLanka"},
    {symbol: "PM", nazwa: "St.Pierre "},
    {symbol: "SD", nazwa: "Sudan"},
    {symbol: "CH", nazwa: "Szwajcaria"},
    {symbol: "SE", nazwa: "Szwecja"},
    {symbol: "SH", nazwa: "Święta Helena"},
    {symbol: "TJ", nazwa: "Tadżykistan"},
    {symbol: "TH", nazwa: "Tajlandia"},
    {symbol: "TG", nazwa: "Togo"},
    {symbol: "TK", nazwa: "Tokelau"},
    {symbol: "TO", nazwa: "Tonga"},
    {symbol: "TN", nazwa: "Tunezja"},
    {symbol: "TR", nazwa: "Turcja"},
    {symbol: "TV", nazwa: "Tuvalu"},
    {symbol: "UG", nazwa: "Uganda"},
    {symbol: "UA", nazwa: "Ukraina"},
    {symbol: "UY", nazwa: "Urugwaj"},
    {symbol: "UZ", nazwa: "Uzbekistan"},
    {symbol: "VU", nazwa: "Vanuatu"},
    {symbol: "VA", nazwa: "Watykan"},
    {symbol: "VE", nazwa: "Wenezuela"},
    {symbol: "HU", nazwa: "Węgry"},
    {symbol: "GB", nazwa: "Wielka_Brytania"},
    {symbol: "VN", nazwa: "Wietnam"},
    {symbol: "IT", nazwa: "Włochy"}
];

const miasta = [
    { kod: "00-001", nazwa: "Warszawa" },
    { kod: "05-084", nazwa: "Leszno" },
    { kod: "10-001", nazwa: "Olsztyn" },
    { kod: "20-001", nazwa: "Lublin" },
    { kod: "30-001", nazwa: "Kraków" },
    { kod: "32-300", nazwa: "Olkusz" },
    { kod: "43-300", nazwa: "Bielsko-Biała" },
    { kod: "32-640", nazwa: "Zator" },
    { kod: "40-001", nazwa: "Katowice" },
    { kod: "41-200", nazwa: "Sosnowiec" },
    { kod: "50-001", nazwa: "Wrocław" },
    { kod: "60-001", nazwa: "Poznań" },
    { kod: "70-001", nazwa: "Szczeciń" },
    { kod: "80-001", nazwa: "Gdańsk" },
    { kod: "90-001", nazwa: "Łódź" }
];

const nazwyUlic = [
    "ul. Jasielska",
    "ul. Jaskółcza",
    "ul. Jaskrowa",
    "ul. Jaśminowa",
    "ul. Jasna",
    "ul. Jasnogórska",
    "ul. Jastrzębia",
    "ul. Jaworowa",
    "ul. Jaxy Gryfity",
    "ul. Jazowa",
    "ul. Jęczmienna",
    "ul. Jeleniogórska",
    "ul. Jeleniowa",
    "ul. Olkuska",
    "ul. Olszanicka",
    "ul. Olszańska",
    "ul. Olszecka",
    "ul. Olsztyńska",
    "ul. Olszyny",
    "ul. Ondraszka",
    "ul. Opalowa",
    "ul. Opata Salwińskiego",
    "ul. Opatkowicka",
    "ul. Opolska",
    "ul. Opty",
    "ul. Agatowa",
    "ul. Agawy",
    "ul. Agrestowa",
    "ul. Akacjowa",
    "ul. Akademicka",
    "ul. Albańska",
    "ul. Albatrosów",
    "ul. Alberta Schweitzera",
    "ul. Aleja 29 Listopada",
    "ul. aleja 3 Maja",
    "ul. Branicka",
    "ul. Braterska",
    "ul. Braterstwa Broni",
    "ul. Bratkowa",
    "ul. Bratysławska",
    "ul. Brązownicza",
    "ul. Brogi",
    "ul. Bronisława Czecha",
    "ul. Bronisława Malinowskiego",
    "ul. Bronisława Pierackiego",
    "ul. Rajska",
    "ul. Rakowicka",
    "ul. Rakuś",
    "ul. Ratajska",
    "ul. Rdzawa",
    "ul. Krótka",
    "ul. Krowoderska",
    "ul. Krowoderskich Zuchów",
    "ul. Krucza",
    "ul. Krupnicza",
    "ul. Kruszwicka",
    "ul. Krymska",
    "ul. Kryniczna"
];

const dodatkoweInformacjeAdresowe = [
    "Sala numer 45 na czwartym piętrze",
    "Sala numer 11 na pierwszym piętrze",
    "Sala numer 25 na drugim piętrze",
    "Sala numer 5 na parterze",
    "Sala numer 42 na czwartym piętrze",
    "Sala numer 47 na czwartym piętrze",
    "Sala numer 9 na parterze",
    "Sala numer 23 na drugim piętrze",
    "Zajęcia w auli na trzecim piętrze",
    "Proszę dzwonić pod siódemkę"
];

const warsztaty = [
    {   nazwa: "JS Upskill #11",
        sugerowanaCena: 100,
        opisWarsztatu: `Web Componenty to zestaw technologii, 
        które powoli, ale pewnie wkraczają do przeglądarek i zapowiadają rewolucję w sposobie w jaki 
        tworzymy i konsumujemy frontendowy kod. Trend ten zapoczątkował React, kładąc nacisk na 
        dekompozycję aplikacji na zestaw mniejszych elementów. Dzięki web componentom takie podejście 
        można zastosować w dowolnej aplikacji. Nie jesteśmy wtedy uwiązani do jednej biblioteki, 
        zyskując masę gotowych elementów gotowych do użycia.`
    },
    {   nazwa: "PHPers Workshop",
        sugerowanaCena: 0,
        opisWarsztatu: `W ciągu 8 godzinnego kursu stworzymy prostą aplikacje księgową przy użyciu wzorców związanych z 
        architekturą portów i adapterów zintegrujemy ją z dwoma przykładowymi framworkami (Symfony 4 oraz Zend Expressive). 
        W czasie kursu będziemy używać php 7.1, dockera, composera, phpunita oraz phpspec więc podstawowa znajomość tych 
        narzędzi na pewno się przyda.`
    },
    {   nazwa: "Warsztaty ROBOproject dla dzieci",
        sugerowanaCena: 60,
        opisWarsztatu: `Tym razem na #14 spotkanie BydgoszczJUG zapraszamy razem z dziećmi. 
        Gdy my będziemy zgłębiać tajniki programowania funkcyjnego i wykorzystania eventów, 
        w holu za ścianą dzieci będą budować roboty i programować je ucząc się podstaw robotyki. 
        Zajęcia zorganizowane będą w dwóch grupach wiekowych 6-9 lat i 10-12 lat. 
        Prosimy o zapisanie się na meetup dotyczący odpowiedniej grupy wiekowej. 
        Jeżeli przyjdziecie z jednym dzieckiem zapisujecie na TEN meetup tylko siebie. 
        Jeżeli przyjdziecie z dwójką dzieci zapisujecie siebie i jedną osobę towarzyszącą itd. 
        Ten meetup dotyczy grupy wiekowej 6-9 lat. Dzieci będą miały zapewnioną opiekę wykwalifikowanej kadry ROBOproject.`
    },
    {   nazwa: "DrupalDay",
        sugerowanaCena: 180,
        opisWarsztatu: `DrupalDay to jeden dzień bezpłatnych szkoleń dla osób, które chcą poznać system Drupal 8. 
        Szkolenia odbywają się w różnych miastach w Polsce. Jest to kontynuacja akcji "Drupal idzie na studia".`
    },
    {   nazwa: "Machine Learning from the scratch - workshop",
        sugerowanaCena: 140,
        opisWarsztatu: `The goal of this one-day workshop is gaining intuitive understanding of machine learning methods, 
        especially deep learning. After covering the necessary theoretical minimum, we’ll be focused on practical tasks 
        from image processing, NLP and personalized recommender systems. All the work will be done in Python with TensorFlow 
        framework. Bring your laptop! No need to worry about it’s performance: all the calculations will be done in the cloud.
        `
    },
    {   nazwa: "PBW: Business Injection",
        sugerowanaCena: 160,
        opisWarsztatu: `Nasz cel jest taki, by dać okazję młodzieży do przećwiczenia i nauki w praktyce 
        przygotowania i zaplanowania projektu w ograniczonym czasie w różnych warunkach pracy. 
        Warsztaty Business Injection trwają 3 dni - 27, 28 i 29 stycznia 2018 r. Na samym początku dostaniesz 
        listę kilku problemów życia codziennego. Twoim zadaniem będzie przygotować w ok. 5-osobowej drużynie projekt, 
        który ma rozwiązać dany problem. Wspólnie z innymi uczestnikami będziesz musiał stworzyć do niego konkretny cel, 
        przedstawić jego mocne oraz słabe strony i strategię rozwoju.`
    },
    {   nazwa: "Code Carrots SQL",
        sugerowanaCena: 120,
        opisWarsztatu: `Warsztat przeznaczony jest dla osób z podstawami SQL’a (potrafisz napisać prostego SELECT’a, 
            łączenie tabel nie jest Ci obce) chcących nauczyć się czegoś więcej. Będzie to spotkanie, na którym skupimy 
            się głównie na umiejętnościach praktycznych.`
    },
    {   nazwa: "Political Writing",
        sugerowanaCena: 80,
        opisWarsztatu: `The American Politics Workshop provides a forum for graduate students and faculty 
        in American politics to discuss the main themes of research in the field today.  
        The meetings are broken down by substantive topic areas and include:  discussion of published work, 
        working papers, faculty and student presentations, and guest speakers.`
    },
    {   nazwa: "Comparative Politics Workshop",
        sugerowanaCena: 40,
        opisWarsztatu: `The Comparative Politics Workshop provides an opportunity for graduate students 
        and faculty engaged in comparative and historical research to present work "in progress" to an audience 
        that is neither specialized in area or era. Thus, the purpose of the workshop is to draw out themes from 
        papers that are based on specialized historical and comparative research that transcend the period and 
        region covered.`
    },
    {   nazwa: "Political Methodology Workshop",
        sugerowanaCena: 50,
        opisWarsztatu: `The Political Methodology Workshop provides a forum for the discussion of theoretical 
        aspects and empirical applications of statistical modeling in the social sciences. The workshop is 
        designed to have both pedagogical sessions and more specialized presentations from invited speakers. 
        Join the Political Methodology Workshop mailing list.`
    },
    {   nazwa: "Group Decision Making",
        sugerowanaCena: 50,
        opisWarsztatu: `As pioneers of decision science, Kepner-Tregoe has been helping executives, 
        business leaders, and workers at all levels make difficult decisions for nearly 60 years. This unique, 
        one-day workshop brings that wealth of experience to the classroom so you can learn to avoid decision 
        making biases, practice new skills, and make an immediate impact back on the job.`
    },
    {   nazwa: "Organizing Rallies and Marches",
        sugerowanaCena: 20,
        opisWarsztatu: `Protests are an integral and necessary part of our social movements. 
        They are the means to assert power, to take power, to pressure a target and to do get what our 
        communities need. Doing them right is easy, and powerful.`
    },
    {   nazwa: "Introduction to Media for Campaigns",
        sugerowanaCena: 200,
        opisWarsztatu: `Moving well beyond social media 101, you’ll learn critical aspects of the major 
        social media networks and how to use each to drive business, dominate your market, and stand out in the newsfeed.`
    },
    {   nazwa: "How to Host a Workshop",
        sugerowanaCena: 0,
        opisWarsztatu: `Hosting an educational workshop is an excellent way to raise your profile as an expert 
        in a health and fitness specialty while providing a great additional revenue stream for your business.`
    },
    {   nazwa: "Advanced Media Skills",
        sugerowanaCena: 50,
        opisWarsztatu: `Increasingly it is not only PR and communications experts who are required to speak with 
        the media but also employees in a wide variety of technical and specialist roles. Media exposure can provide 
        excellent opportunities to publicise your organisation and portray your work in a positive light.`
    },
];

module.exports = { 
    nazwyKonferencji: nazwyKonferencji,
    kraje: kraje,
    miasta: miasta,
    nazwyUlic: nazwyUlic,
    dodatkoweInformacjeAdresowe: dodatkoweInformacjeAdresowe,
    warsztaty: warsztaty
};