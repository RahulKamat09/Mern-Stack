import React from 'react'
import Card from './components/Card'

function App() {

  const jobs = [
    {
      brandLogo: "https://logo.clearbit.com/amazon.com",
      companyName: "Amazon",
      datePosted: "1 month ago",
      role: "Frontend Engineer",
      tag1: "Full Time",
      tag2: "Junior Level",
      pay: "$120/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/google.com",
      companyName: "Google",
      datePosted: "2 weeks ago",
      role: "Backend Engineer",
      tag1: "Part Time",
      tag2: "Senior Level",
      pay: "$150/hr",
      location: "Bangalore, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/microsoft.com",
      companyName: "Microsoft",
      datePosted: "3 days ago",
      role: "Full Stack Developer",
      tag1: "Contract",
      tag2: "Mid Level",
      pay: "$100/hr",
      location: "Hyderabad, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/netflix.com",
      companyName: "Netflix",
      datePosted: "5 days ago",
      role: "React Developer",
      tag1: "Full Time",
      tag2: "Senior Level",
      pay: "$130/hr",
      location: "Remote"
    },
    {
      brandLogo: "https://logo.clearbit.com/apple.com",
      companyName: "Apple",
      datePosted: "1 week ago",
      role: "UI/UX Designer",
      tag1: "Full Time",
      tag2: "Junior Level",
      pay: "$90/hr",
      location: "Pune, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/meta.com",
      companyName: "Meta",
      datePosted: "4 days ago",
      role: "Frontend React Engineer",
      tag1: "Full Time",
      tag2: "Mid Level",
      pay: "$110/hr",
      location: "Gurgaon, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/tesla.com",
      companyName: "Tesla",
      datePosted: "2 weeks ago",
      role: "Backend Node.js Developer",
      tag1: "Contract",
      tag2: "Senior Level",
      pay: "$140/hr",
      location: "Remote"
    },
    {
      brandLogo: "https://logo.clearbit.com/spotify.com",
      companyName: "Spotify",
      datePosted: "6 days ago",
      role: "Software Engineer",
      tag1: "Full Time",
      tag2: "Mid Level",
      pay: "$125/hr",
      location: "Delhi, India"
    },
    {
      brandLogo: "https://tse2.mm.bing.net/th/id/OIP.xU7DxbgmJaBqHbtYsF2B5QHaFj?pid=Api&P=0&h=180",
      companyName: "Adobe",
      datePosted: "3 weeks ago",
      role: "Frontend Vue Developer",
      tag1: "Part Time",
      tag2: "Junior Level",
      pay: "$80/hr",
      location: "Chennai, India"
    },
    {
      brandLogo: "https://tse4.mm.bing.net/th/id/OIP.2oiBEbCOVsFhInNCvBXJ-wHaFj?pid=Api&P=0&h=180",
      companyName: "IBM",
      datePosted: "2 days ago",
      role: "Cloud Engineer",
      tag1: "Full Time",
      tag2: "Senior Level",
      pay: "$160/hr",
      location: "Noida, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/intel.com",
      companyName: "Intel",
      datePosted: "1 week ago",
      role: "Machine Learning Engineer",
      tag1: "Full Time",
      tag2: "Senior Level",
      pay: "$170/hr",
      location: "Bangalore, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/oracle.com",
      companyName: "Oracle",
      datePosted: "2 weeks ago",
      role: "Java Backend Developer",
      tag1: "Full Time",
      tag2: "Mid Level",
      pay: "$115/hr",
      location: "Hyderabad, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/salesforce.com",
      companyName: "Salesforce",
      datePosted: "3 days ago",
      role: "Salesforce Developer",
      tag1: "Contract",
      tag2: "Senior Level",
      pay: "$150/hr",
      location: "Remote"
    },
    {
      brandLogo: "https://logo.clearbit.com/zoom.us",
      companyName: "Zoom",
      datePosted: "6 days ago",
      role: "Frontend Angular Developer",
      tag1: "Full Time",
      tag2: "Mid Level",
      pay: "$105/hr",
      location: "Delhi, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/uber.com",
      companyName: "Uber",
      datePosted: "1 month ago",
      role: "Mobile App Developer",
      tag1: "Part Time",
      tag2: "Junior Level",
      pay: "$90/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/airbnb.com",
      companyName: "Airbnb",
      datePosted: "2 weeks ago",
      role: "Full Stack Engineer",
      tag1: "Full Time",
      tag2: "Senior Level",
      pay: "$140/hr",
      location: "Remote"
    },
    {
      brandLogo: "https://logo.clearbit.com/paypal.com",
      companyName: "PayPal",
      datePosted: "5 days ago",
      role: "Backend GoLang Developer",
      tag1: "Full Time",
      tag2: "Mid Level",
      pay: "$120/hr",
      location: "Pune, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/shopify.com",
      companyName: "Shopify",
      datePosted: "4 days ago",
      role: "Shopify Theme Developer",
      tag1: "Contract",
      tag2: "Mid Level",
      pay: "$95/hr",
      location: "Remote"
    },
    {
      brandLogo: "https://logo.clearbit.com/dropbox.com",
      companyName: "Dropbox",
      datePosted: "1 week ago",
      role: "Cloud DevOps Engineer",
      tag1: "Full Time",
      tag2: "Senior Level",
      pay: "$155/hr",
      location: "Gurgaon, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/slack.com",
      companyName: "Slack",
      datePosted: "2 days ago",
      role: "React Native Developer",
      tag1: "Full Time",
      tag2: "Junior Level",
      pay: "$100/hr",
      location: "Bangalore, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/twitter.com",
      companyName: "Twitter",
      datePosted: "3 weeks ago",
      role: "Frontend Next.js Developer",
      tag1: "Full Time",
      tag2: "Mid Level",
      pay: "$110/hr",
      location: "Hyderabad, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/stripe.com",
      companyName: "Stripe",
      datePosted: "5 days ago",
      role: "Backend API Engineer",
      tag1: "Full Time",
      tag2: "Senior Level",
      pay: "$160/hr",
      location: "Remote"
    },
    {
      brandLogo: "https://logo.clearbit.com/cisco.com",
      companyName: "Cisco",
      datePosted: "3 days ago",
      role: "Network Engineer",
      tag1: "Contract",
      tag2: "Mid Level",
      pay: "$100/hr",
      location: "Noida, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/siemens.com",
      companyName: "Siemens",
      datePosted: "1 month ago",
      role: "Embedded Systems Developer",
      tag1: "Full Time",
      tag2: "Junior Level",
      pay: "$85/hr",
      location: "Chennai, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/tcs.com",
      companyName: "TCS",
      datePosted: "1 week ago",
      role: "Software Developer",
      tag1: "Full Time",
      tag2: "Mid Level",
      pay: "$70/hr",
      location: "Pune, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/infosys.com",
      companyName: "Infosys",
      datePosted: "2 weeks ago",
      role: "React JS Developer",
      tag1: "Full Time",
      tag2: "Senior Level",
      pay: "$95/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/wipro.com",
      companyName: "Wipro",
      datePosted: "3 days ago",
      role: "Backend Developer",
      tag1: "Full Time",
      tag2: "Mid Level",
      pay: "$80/hr",
      location: "Hyderabad, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/cognizant.com",
      companyName: "Cognizant",
      datePosted: "4 days ago",
      role: "UX Designer",
      tag1: "Part Time",
      tag2: "Junior Level",
      pay: "$75/hr",
      location: "Kolkata, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/accenture.com",
      companyName: "Accenture",
      datePosted: "6 days ago",
      role: "Cloud Architect",
      tag1: "Full Time",
      tag2: "Senior Level",
      pay: "$145/hr",
      location: "Gurgaon, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/capgemini.com",
      companyName: "Capgemini",
      datePosted: "1 week ago",
      role: "Java Developer",
      tag1: "Full Time",
      tag2: "Mid Level",
      pay: "$90/hr",
      location: "Bangalore, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/hp.com",
      companyName: "HP",
      datePosted: "1 week ago",
      role: "System Administrator",
      tag1: "Contract",
      tag2: "Senior Level",
      pay: "$130/hr",
      location: "Delhi, India"
    },
    {
      brandLogo: "https://logo.clearbit.com/dell.com",
      companyName: "Dell",
      datePosted: "3 days ago",
      role: "Technical Support Engineer",
      tag1: "Full Time",
      tag2: "Junior Level",
      pay: "$60/hr",
      location: "Pune, India"
    }
  ];

  return (
    <div className='parent'>
      {jobs.map(function (job, index) {
        return (
          <div key={index}>
            <Card
              brandLogo={job.brandLogo}
              companyName={job.companyName}
              datePosted={job.datePosted}
              role={job.role}
              tag1={job.tag1}
              tag2={job.tag2}
              pay={job.pay}
              location={job.location}
            />
          </div>
        )
      }
      )}
    </div>
  )
}

export default App