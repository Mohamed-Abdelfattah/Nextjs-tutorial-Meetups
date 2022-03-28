import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function Home(props) {
  //
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="The place to find all meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   // this will make server generate the page (re-render) on the fly for each and every request and should
//   // be used if the data on the page changes freq (couple times or more each second which will not be possible to handle with revalidate:1s)
//   // or if we depend on some info within the request e.g. for auth might need session info in the req
//   const { req, res } = context;
//   // fetch some data
//   return {
//     props: { meetups: DUMMY },
//   };
// }

export async function getStaticProps() {
  // fetch data from server will be exported to server during build and won't reach client and will make
  // the page component waits till the promise resolves and then will pass the returns to use them for pre-rendering

  console.log(process.env.DB_API);
  const client = await MongoClient.connect(process.env.DB_API);

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default Home;
