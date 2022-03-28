// domain.com/new-meetup
import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  //
  const router = useRouter();

  const onAddMeetupHandler = async (inputData) => {
    // console.log(inputData);
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(inputData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    // console.log(data);

    router.push('/');
  };

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Register your meetup and be part of the community"
        />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
