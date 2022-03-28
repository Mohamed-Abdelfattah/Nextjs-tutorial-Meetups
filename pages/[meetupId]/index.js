import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetails from '../../components/meetups/MeetupDetails';

const MeetupDetailsPage = (props) => {
  //
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetails
        id={props._id}
        address={props.address}
        title={props.title}
        description={props.description}
        image={props.image}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  //
  const client = await MongoClient.connect(process.env.DB_API);

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //
  const id = context.params.meetupId;
  // console.log(id);

  const client = await MongoClient.connect(process.env.DB_API);

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(id) });

  client.close();

  return {
    props: {
      ...selectedMeetup,
      _id: selectedMeetup._id.toString(),
    },
  };
}

export default MeetupDetailsPage;
