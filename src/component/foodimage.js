const Food = [
    {
        id: 1,
        url: require("../component/Dashboard/image/AmenityInstallation.png"),
        rate: '999',
        title: 'Amenity Installation',
        description: '',
        titlename: 'HomeMaintenance',
        titleId: 1,
        stock: Math.floor(Math.random() * (10 - 3 + 1)) + 3 // Stock: 3-10 available slots/teams
    },
    {
        id: 2,
        url: require("../component/Dashboard/image/ConstructionandRenovation.jpeg"),
        rate: '999',
        title: 'Construction and Renovation',
        description: '',
        titlename: 'HomeMaintenance',
        titleId: 1,
        stock: Math.floor(Math.random() * (5 - 1 + 1)) + 1 // Stock: 1-5 active projects/teams
    },
    {
        id: 3,
        url: require("../component/Dashboard/image/Gardening.jpg"),
        rate: '999',
        title: 'Gardening',
        description: '',
        titlename: 'HomeMaintenance',
        titleId: 1,
        stock: Math.floor(Math.random() * (15 - 5 + 1)) + 5 // Stock: 5-15 available gardeners/slots
    },
    {
        id: 4,
        url: require("../component/Dashboard/image/HandymanService.jpg"),
        rate: '999',
        title: 'Handyman Service',
        description: "",
        titlename: 'HomeMaintenance',
        titleId: 1,
        stock: Math.floor(Math.random() * (20 - 7 + 1)) + 7 // Stock: 7-20 available handymen/daily slots
    },
    {
        id: 5,
        url: require("../component/Dashboard/image/InteriorDecoration.jpg"),
        rate: '999',
        title: 'Interior Decoration',
        description: '',
        titlename: 'HomeMaintenance',
        titleId: 1,
        stock: Math.floor(Math.random() * (5 - 1 + 1)) + 1 // Stock: 1-5 ongoing projects/designers
    },
    {
        id: 6,
        url: require("../component/Dashboard/image/PlumbingandElectricalRepair.webp"),
        rate: '999',
        title: 'House Repairs',
        description: '',
        titlename: 'HomeMaintenance',
        titleId: 1,
        stock: Math.floor(Math.random() * (15 - 5 + 1)) + 5 // Stock: 5-15 plumbers/electricians available
    },
    {
        id: 2.1,
        url: require("../component/Dashboard/image/FoodDeliveryService.jpg"),
        rate: '999',
        title: 'Food Delivery Service',
        titlename: 'SelfPamper',
        titleId: 2,
        description: '',
        stock: Math.floor(Math.random() * (50 - 20 + 1)) + 20 // Stock: 20-50 daily delivery slots/riders
    },
    {
        id: 2.2,
        url: require("../component/Dashboard/image/GroomingandBeautyServices.webp"),
        rate: '999',
        title: 'Beauty Services',
        titlename: 'SelfPamper',
        titleId: 2,
        description: '',
        stock: Math.floor(Math.random() * (30 - 10 + 1)) + 10 // Stock: 10-30 daily appointment slots
    },
    {
        id: 2.3,
        url: require("../component/Dashboard/image/HomeHealthcareservices.webp"),
        rate: '999',
        title: ' Home Healthcare services',
        titlename: 'SelfPamper',
        titleId: 2,
        description: '',
        stock: Math.floor(Math.random() * (10 - 2 + 1)) + 2 // Stock: 2-10 available nurses/sessions
    },
    {
        id: 2.4,
        url: require("../component/Dashboard/image/HomeMassage.jpg"),
        rate: '999',
        title: 'Home Massage',
        titlename: 'SelfPamper',
        titleId: 2,
        description: '',
        stock: Math.floor(Math.random() * (25 - 8 + 1)) + 8 // Stock: 8-25 daily massage slots
    },
    {
        id: 2.5,
        url: require("../component/Dashboard/image/PetServices.jpg"),
        rate: '999',
        title: 'Pet Services',
        titlename: 'SelfPamper',
        titleId: 2,
        description: '',
        stock: Math.floor(Math.random() * (30 - 10 + 1)) + 10 // Stock: 10-30 available pet groomers/sitters/walkers
    },
    {
        id: 2.6,
        url: require("../component/Dashboard/image/ProfessionalOrganizerConsultation.webp"),
        rate: '999',
        title: 'Professional Consultation',
        titlename: 'SelfPamper',
        titleId: 2,
        description: '',
        stock: Math.floor(Math.random() * (10 - 3 + 1)) + 3 // Stock: 3-10 available consultation slots
    },
    {
        id: 3.1,
        url: require("../component/Dashboard/image/BusinessandCareerCounseling.jpg"),
        rate: '999',
        title: 'Businessand CareerCounseling',
        description: "T",
        fakerate: 900,
        titlename: 'SelfImprovement',
        titleId: 3,
        stock: Math.floor(Math.random() * (15 - 5 + 1)) + 5 // Stock: 5-15 available counselors/slots
    },
    {
        id: 3.2,
        url: require("../component/Dashboard/image/ChildcareServices.webp"),
        rate: '999',
        title: 'Childcare Services',
        description: "",
        titlename: 'SelfImprovement',
        titleId: 3,
        stock: Math.floor(Math.random() * (20 - 7 + 1)) + 7 // Stock: 7-20 available childcare providers/slots
    },
    {
        id: 3.3,
        url: require("../component/Dashboard/image/LifeCoachingSessions.webp"),
        rate: '999',
        title: 'LifeCoaching Sessions',
        description: "",
        titlename: 'SelfImprovement',
        titleId: 3,
        stock: Math.floor(Math.random() * (12 - 4 + 1)) + 4 // Stock: 4-12 available coaches/slots
    },
    {
        id: 3.4,
        url: require("../component/Dashboard/image/NutritionistConsultation.jpg"),
        rate: '999',
        title: 'Nutritionist Consultation',
        description: "",
        titlename: 'SelfImprovement',
        titleId: 3,
        stock: Math.floor(Math.random() * (10 - 3 + 1)) + 3 // Stock: 3-10 available nutritionists/slots
    },
    {
        id: 3.5,
        url: require("../component/Dashboard/image/OnlineClasses.avif"),
        rate: '999',
        title: 'Online Classes',
        description: "",
        titlename: 'SelfImprovement',
        titleId: 3,
        stock: Math.floor(Math.random() * (100 - 30 + 1)) + 30 // Stock: 30-100 available seats/licenses
    },
    {
        id: 3.6,
        url: require("../component/Dashboard/image/PhysicalTrainingSession.jpg"),
        rate: '999',
        title: 'Physical Training Session',
        description: "",
        titlename: 'SelfImprovement',
        titleId: 3,
        stock: Math.floor(Math.random() * (20 - 5 + 1)) + 5 // Stock: 5-20 available trainers/slots
    },
    {
        id: 3.7,
        url: require("../component/Dashboard/image/TutoringServices.avif"),
        rate: '999',
        title: 'Tutoring Services',
        description: "",
        titlename: 'SelfImprovement',
        titleId: 3,
        stock: Math.floor(Math.random() * (25 - 8 + 1)) + 8 // Stock: 8-25 available tutors/sessions
    },
];

export default Food;