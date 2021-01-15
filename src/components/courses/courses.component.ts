import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { TabSelectionConfig } from '../tab-selection/tab-selection-config';

export interface CoursesObjectType {
  name: string;
  code: string;
  programme: string;
  programmeCode: string;
  semester: string;
  category: string;
  categoryCode: string;
  credits: string;
  content: string;
  references: string[];
  department: string;
  instructor: string[];
  isSelected: boolean;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  tabSelectionConfig: TabSelectionConfig[] = [
    {
      name: 'Undergraduate',
      code: 'UNDERGRADUATE'
    },
    {
      name: 'Postgraduate',
      code: 'POSTGRADUATE'
    },
    {
      name: 'Doctoral',
      code: 'DOCTORAL'
    }
  ];

  selectedTab: string = 'UNDERGRADUATE';

  get isUnderGranduateCourseSelected() {
    return this.selectedTab.toUpperCase() === 'UNDERGRADUATE';
  }

  get isPostGranduateCourseSelected() {
    return this.selectedTab.toUpperCase() === 'POSTGRADUATE';
  }

  get isDocotalCourseSelected() {
    return this.selectedTab.toUpperCase() === 'DOCTORAL';
  }

  underGraduateCourses: CoursesObjectType[] = [
    {
      name: 'Computer Programming',
      code: 'CO110',
      programme: 'B.Tech',
      programmeCode: 'CSE',
      semester: 'First',
      category: 'Engineering Science Core',
      categoryCode: 'ESC',
      credits: '04 (3-1-0)',
      content: 'Concepts, definitions, taxonomy and history of Computer Programming, Operating systems and Program Execution basics. Problem solving and programming: strategies, programming paradigms,software development life cycle. C programming language: C fundamentals, operators and expressions, Data input and output, Control statements, Functions, Arrays, Pointers, Dynamic memory allocations, Structure and unions, Files, Low- level Programming and Macros.',
      references: [
        'Brian W. Kernighan and Dennis M. Ritchie, "The C Programming Language", Second Edition, PHI.',
        'Byron S. Gottfried, "Program with C", Second Edition, Schaums Outline Series.',
        'Yashavanth Kanetkar, "Let us C", BPB Publications, 2002.'
      ],
      department: 'Computer Science and Engineering',
      instructor: [
        'Annappa B.',
        'B. R. Chandravarkar',
        'Vani M',
        'Jeny Rajan'
      ],
      isSelected: false
    },
    {
      name: 'Computer Programming Lab',
      code: 'CO101',
      programme: 'B.Tech',
      programmeCode: 'CSE',
      semester: 'Second',
      category: 'Engineering Science Core',
      categoryCode: 'ESC',
      credits: '01 (0-0-2)',
      content: 'Introduction to fundamentals of DOS and Windows, C Programming exercise on simple statements, Control structures, Arrays, Matrices, Strings, Functions and Recursions, Structures and Unions, Bit Operations, Pointers, Dynamic Memory allocation, Files and Macros.',
      references: [
        'Brian W. Kernighan and Dennis M. Ritchie, "The C Programming Language", Second Edition, PHI.',
        'Byron S. Gottfried, "Program with C", Second Edition, Schaums Outline Series.',
        'Yashavanth Kanetkar, "Let us C", BPB Publications, 2002.'
      ],
      department: 'Computer Science and Engineering',
      instructor: [
        'Annappa B.',
        'B. R. Chandravarkar',
        'Vani M',
        'Jeny Rajan'
      ],
      isSelected: false
    },
    {
      name: 'Computer Organisation And Architecture',
      code: 'CO200',
      programme: 'B.Tech',
      programmeCode: 'CSE',
      semester: 'Third',
      category: 'Programme Core',
      categoryCode: 'PC',
      credits: '03 (3-0-0)',
      content: 'Logical organization of computers; Processor basics, CPU organization, Data Representation, Instruction Sets, Data path design, Fixed Point arithmetic, ALU design, Control design: Basic concepts, Micro programmed Control & hardwired; Introduction to parallel processing: Principles of pipeline and vector processing. Multiprocessor architectures and programming.',
      references: [
        'J.P.Hayes, "Computer Architecture and organization", Third Edition, McGraw Hill, 1998.',
        'Hwang and Briggs, "Computer Architecture and parallel processing", McGraw Hill, 1985.',
        'David A. Patterson and John L. Hennessy, "Computer Organization and Design", Third Edition, Morgan Kaufmann Publication.'
      ],
      department: 'Computer Science and Engineering',
      instructor: [],
      isSelected: false
    },
    {
      name: 'Information Systems',
      code: 'CO261',
      programme: 'B.Tech',
      programmeCode: 'CSE',
      semester: 'Fourth',
      category: 'Programme Specific Electives',
      categoryCode: 'PSE',
      credits: '03 (3-0-0)',
      content: 'Information System Design and Development - phases; System analysis methods - Data, Process, Network and Object modeling; System design approaches / methods - architectures and processes, input and output, prototyping; system implementation, safety & security, maintenance.',
      references: [
        'Jeffrey.L.Whitten, Lonnie.D.Bentley, "System analysis and design methods", Fourth Edition, Tata McGraw Hill, 2002.',
        'James.A.Senn, "Analysis and Design of Information System", Second Edition, McGraw Hill, 2002.'
      ],
      department: 'Computer Science and Engineering',
      instructor: [],
      isSelected: false
    },
    {
      name: 'Computer Networks',
      code: 'CO303',
      programme: 'B.Tech',
      programmeCode: 'CSE',
      semester: 'Fifth',
      category: 'Programme Core',
      categoryCode: 'PC',
      credits: '04 (3-1-0)',
      content: 'Introduction, Layered Architecture of Computer Networks, OSI and TCP/IP architectures & layers with protocols, Internetworking & routing, Network security, Mobile networks and current trends.',
      references: [
        'Behrouz A. Forouzan, "Data Communications and Networks", Third Edition, Tata McGraw Hill.',
        'James F. Kurose, Keith W. Ross, "Computer Networking: A Top-Down Approach", Sixth Edition, Pearson Publication.',
        'Andrew. S. Tannenbaum, "Computer Networks", Second Edition, Prentice Hall of India, 2002.'
      ],
      department: 'Computer Science and Engineering',
      instructor: [
        'B. R. Chandravarkar'
      ],
      isSelected: false
    },
    {
      name: 'Software Lab',
      code: 'CO355',
      programme: 'B.Tech',
      programmeCode: 'CSE',
      semester: 'Sixth',
      category: 'Programme Core',
      categoryCode: 'PC',
      credits: '',
      content: 'Mini project to be designed to give exposure to the latest developments in Software Engineering and to understand the use of Project Management skills, Use of CASE tools.',
      references: [],
      department: 'Computer Science and Engineering',
      instructor: [],
      isSelected: false
    },
    {
      name: 'Number Theory and Cryptography',
      code: 'CO400',
      programme: 'B.Tech',
      programmeCode: 'CSE',
      semester: 'Seventh',
      category: 'Programme Core',
      categoryCode: 'PC',
      credits: '03 (3-0-0)',
      content: 'Elementary number theory, Finite fields, Arithmetic and algebraic algorithms, Secret key and public key cryptography, Pseudo random bit generators, Block and stream ciphers,Hash functions and message digests, Public key encryption, Probabilistic encryption, Authentication, Digital signatures, Zero knowledge interactive protocols, Elliptic curve cryptosystems, Formal verification, Hard problems, Randomness and Pseudo randomness and Testing.',
      references: [
        'Koblitz N., "Course on Number Theory and Cryptography", Springer Verlag, 1986.',
        'Menezes A. et.al., "Handbook of Applied Cryptography", CRC Press, 1996.',
        'Ivan Niven, Herbert S. Zukerman, Hugh L.Montgomery, "An Introduction to the Theory of Numbers".'
      ],
      department: 'Computer Science and Engineering',
      instructor: [
        'Alwyn Roshan Pais'
      ],
      isSelected: false
    },
    {
      name: 'Major Project – II',
      code: 'CO499',
      programme: 'B.Tech',
      programmeCode: 'CSE',
      semester: 'Eighth',
      category: 'Programme Major Project',
      categoryCode: 'PMP',
      credits: '06 (0-0-9)',
      content: 'The Student has to select a project work based on a topic of interest. Periodically the implementation will be evaluated by the project guide. This work, started in VII semester continues through eighth semester at the end of which, the student will be evaluated internally and externally.',
      references: [],
      department: 'Computer Science and Engineering',
      instructor: [],
      isSelected: false
    }
  ]

  postGraduateCourses: CoursesObjectType[] = [
    {
      name: 'Software Project Management',
      code: 'CS800',
      programme: 'M.Tech',
      programmeCode: 'CSE',
      semester: 'First',
      category: 'Elective Courses',
      categoryCode: 'Ele',
      credits: '03 (3-0-0)',
      content: 'Basic concepts of project management, Managing requirements, Software lifecycles, Software estimation, The project plan, Monitoring the project, Risk analysis, Managing quality and People problems, CMM and P-CMM Principles.',
      references: [
        'Joel Henry, "Software Project Management", Pearson Education, 2003.',
        'Kenneth R. Bainey, "Integrated IT Project Management: A Model-Centric Approach", Allied Publishers.',
        'Mario E. Moreira, "Software Configuration Management Hand Book", Allied Publishers, 2004.'
      ],
      department: 'Computer Science and Engineering',
      instructor: [],
      isSelected: false
    },
    {
      name: 'Database Engineering',
      code: 'CS702',
      programme: 'M.Tech',
      programmeCode: 'CSE',
      semester: 'Second',
      category: 'Programme Core',
      categoryCode: 'PC',
      credits: '04 (3-0-2)',
      content: 'Distributed Databases: principles, Architecture, Design, Query Optimization, Transaction Processing, Concurrency control, Integrity and Security, Client/server architecture, Parallel Databases, Web databases, Current trends in database systems.',
      references: [
        'M.TamerÖzsu, "Principles of Distributed Database Systems", Second Edition.',
        'Raghu Ramakrishnan, "Database Management Systems", McGraw-Hill, 2000.',
        'Ceri S and Pelagatti G,"Distributed Databases Principles and Systems", Mc.Graw Hill, 1999.'
      ],
      department: 'Computer Science and Engineering',
      instructor: [
        'P. Santhi Thilagam'
      ],
      isSelected: false
    },
    {
      name: 'Network Security',
      code: 'IS703',
      programme: 'M.Tech',
      programmeCode: 'CSE-IS',
      semester: 'Second',
      category: 'Programme Core',
      categoryCode: 'PC',
      credits: '04 (3-0-2)',
      content: 'Introduction - Attacks, services and mechanisms - Classical encryption techniques - DES-Block cipher - Design principles and modes of operation. Encryption Algorithms - Hash functions - Triple DES - RC5 - Key management – Public key cryptography - RSA algorithm - Digital signatures and authentication protocols. System Security - Backups - integrity management - protecting against programmed threats, viruses and worms - physical security - Personnel security. Network security - Protection against eavesdropping - Security for modems - IP security - Web security - Electronic mail security - Authentication applications. Security tools-Firewalls-Wrappers-proxies-Discovering a break-in Denial of services attacks and solutions - Cryptographic security tools: Kerberos, PGP, SSH, SRP, OPIE.',
      references: [
        'William Stallings, "cryptography and network security – principles and practice", ii Edition, Pearson education, 2000',
        'Steve Burnett, Stephene Paine, "rsa security official guide to cryptography", TMH, 2001',
        'E. Nemeth, g. snyder, S. Seenass, t.r. Hein, "unix system administration Handbook", 3rd Ed., PEL'
      ],
      department: 'Computer Science and Engineering',
      instructor: [
        'Mohit P. Tahiliani'
      ],
      isSelected: false
    },
    {
      name: 'Mini Project',
      code: 'IS704',
      programme: 'M.Tech',
      programmeCode: 'CSE-IS',
      semester: 'First',
      category: 'Programme Core',
      categoryCode: 'PC',
      credits: '02',
      content: 'Experimental Design / Implementation tasks of relatively minor intensity and scope as compared to the Major-project and in line with the guidelines formulated by DPGC (CSE-IS).',
      references: [],
      department: 'Computer Science and Engineering',
      instructor: [],
      isSelected: false
    }
  ];

  doctoralCourses: CoursesObjectType[] = [
    {
      name: 'VLSI Systems-Design and Testing: Perspectives from Computer Engineering',
      code: 'CS906',
      programme: 'Ph.D',
      programmeCode: '',
      semester: '',
      category: '',
      categoryCode: '',
      credits: '04(3-1-0)',
      content: 'State machine model design of VLSI system, Computational aspects of VLSI and algorithm, Genetic algorithms for VLSI Design partitioning cell routing.',
      references: [
        'S. Sjoholm and L. Lindth, "VHDL for Designers", Prentice Hall.',
        'J. D. Ullman, "Computational aspects of VLSI", Computer Science Press.',
        'Pinaki Mazumder, Elizabeth M. Rudrick,"Genetic Algorithm for VLSI Design, Layout and Test Automation".'
      ],
      department: 'Computer Science and Engineering',
      instructor: [],
      isSelected: false
    },
    {
      name: 'Network Algorithms',
      code: 'CS915',
      programme: 'Ph.D',
      programmeCode: '',
      semester: '',
      category: '',
      categoryCode: '',
      credits: '04(3-1-0)',
      content: 'Algorithms for data aggregation in networks and distributed systems, algorithms for distributed search, algorithms for distributed configuration management, and algorithms for distributed trust and reputation schemes, overlay networks.',
      references: [
        'Ravindra K. Ahuja, Thomas L. Magnanti, James B. Orlin,"Network flows,Theory, Algorithms, and Applications", Prentice-Haal, Englewood Cliffs, New Jersey, 1993.',
        'Alexander Schrijver, "Combinatorial Optimization , Polyhedra and Efficiency" ,Springer-Verlag, 2003.',
        'Christos H. Papadimitriou, Kenneth Steiglitz ," Combinatorial optimization : Algorithms and complexity" .'
      ],
      department: 'Computer Science and Engineering',
      instructor: [],
      isSelected: false
    },
    {
      name: 'Web Engineering',
      code: 'CS910',
      programme: 'Ph.D',
      programmeCode: '',
      semester: '',
      category: '',
      categoryCode: '',
      credits: '04(3-1-0)',
      content: 'Requirements specification and analysis, Web-based systems development methodologies and techniques ,Migration of legacy systems to Web environments ,Web-based real-time applications development, Testing , verification and validation ,Quality assessment, control and assurance, Configuration and project management, “Web metrics” – generating metrics for estimation of development efforts, Performance specification and evaluation ,Update and maintenance, Development models, teams, staffing, Integration with legacy systems, Human and cultural aspects, User-centric development, user modeling and user involvement and feedback, End-user application development.',
      references: [
        'Journal of Web Engineering, Rinton Press and IEEE and ACM publications on these areas.',
        'Cato and John, "User centered Web design", Pearson Education, 2001.',
        'Zimmermann Olaj, Tomlinson Mark R, Peuser, Stefan, "Perspectives on Web Services", Allied Publishers, 2004.'
      ],
      department: 'Computer Science and Engineering',
      instructor: [],
      isSelected: false
    }
  ];

  selectedCourseType: CoursesObjectType[] = this.underGraduateCourses;

  selectedCourse: CoursesObjectType = this.selectedCourseType[0];

  selectedProgramme: string = 'All';

  selectedSemester: string = 'All';

  selectedCategory: string = 'All';

  constructor() { }

  ngOnInit(): void {
    this.selectedCourse.isSelected = true;
  }

  resetSelectedCourse() {
    if (this.selectedCourse) {
      this.selectedCourse.isSelected = false;
    }
    this.selectedCourse = null as any;
  }

  tabClickHandler(selectedTab: string) {
    this.selectedTab = selectedTab;
    this.resetSelectedCourse();
    this.selectedProgramme = 'All';
    this.selectedSemester = 'All';
    this.selectedCategory = 'All';
    this.selectedCourseType = this.getCourseDetails();
    this.selectedCourse = this.selectedCourseType[0];
    this.selectedCourse.isSelected = true;
  }

  getCourseDetails(): CoursesObjectType[] {
    switch (this.selectedTab && this.selectedTab.toUpperCase()) {
      case 'UNDERGRADUATE':
        return this.underGraduateCourses;
      case 'POSTGRADUATE':
        return this.postGraduateCourses;
      case 'DOCTORAL':
        return this.doctoralCourses;
      default:
        return [];
    }
  }

  courseNameClickHandler(courseDetail: CoursesObjectType) {
    courseDetail.isSelected = true;
    this.selectedCourse.isSelected = false;
    this.selectedCourse = courseDetail;
  }

  programmeChangeHandler(event: any) {
    this.selectedProgramme = event && event.target && event.target.value;
    this.setFilterCourseListHandler();
  }

  semesterChangeHandler(event: any) {
    this.selectedSemester = event && event.target && event.target.value;
    this.setFilterCourseListHandler();
  }

  categoryChangeHandler(event: any) {
    this.selectedCategory = event && event.target && event.target.value;
    this.setFilterCourseListHandler();
  }

  setFilterCourseListHandler() {
    this.resetSelectedCourse();
    if (this.selectedSemester.toUpperCase() === 'ALL') {
      this.selectedCourseType = this.getCourseDetails();
    } else {
      const temp: CoursesObjectType[] = Object.assign([], this.getCourseDetails());
      this.selectedCourseType = temp.filter((value: CoursesObjectType) => {
        return value && value.semester && value.semester.toUpperCase() === this.selectedSemester.toUpperCase();
      });
    }

    if (this.selectedCourseType && this.selectedCourseType.length) {
      if (this.selectedCategory.toUpperCase() === 'ALL') {
        this.selectedCourse = this.selectedCourseType[0];
        this.selectedCourse.isSelected = true;
      } else {
        const temp: CoursesObjectType[] = Object.assign([], this.selectedCourseType);
        this.selectedCourseType = temp.filter((value: CoursesObjectType) => {
          return value && value.categoryCode && value.categoryCode.toUpperCase() === this.selectedCategory.toUpperCase();
        });
        if (this.selectedCourseType && this.selectedCourseType.length) {
          this.selectedCourse = this.selectedCourseType[0];
          this.selectedCourse.isSelected = true;
        }
      }
    }

    if (this.isPostGranduateCourseSelected && this.selectedCourseType && this.selectedCourseType.length) {
      if (this.selectedProgramme.toUpperCase() !== 'ALL') {
        this.resetSelectedCourse();
        const temp: CoursesObjectType[] = Object.assign([], this.selectedCourseType);
        this.selectedCourseType = temp.filter((value: CoursesObjectType) => {
          return value && value.programmeCode && value.programmeCode.toUpperCase() === this.selectedProgramme.toUpperCase();
        });
        if (this.selectedCourseType && this.selectedCourseType.length) {
          this.selectedCourse = this.selectedCourseType[0];
          this.selectedCourse.isSelected = true;
        }
      }
    } 
  }

}
