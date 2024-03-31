import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import SubTitle from '@/components/shared/sub-title';
import Badge from '@/components/ui/badge';
import { Activity } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from './dictionaries';
import Breadcumb from '@/components/shared/breadcumb';

export const metadata = {
  title: 'Home — Find everything about me',
  description: 'This is the home page',
};

export const dynamic = 'force-dynamic';

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/data/activities`,
  );
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/data/activities`);
  const data = await res.json();
  const activities: Activity[] = data.activities.data;

  const dictionary = await getDictionary(lang);

  return (
    <div>
      <PageInfo
        breadcumb={
          <Breadcumb
            firstNav={{
              name: dictionary.page.home.name.third,
              url: `/${lang}`,
            }}
          />
        }
        header={
          <div>
            <h1 className="font-black text-[40px] sm:text-[36px]">
              {dictionary.page.home.name.first}{' '}
              <span className="text-blue-500">
                {dictionary.page.home.name.second}
              </span>
            </h1>
          </div>
        }
        description={dictionary.page.home.description}
        footer={
          <Link
            className="flex gap-1 items-center text-blue-500 font-bold text-[14px]"
            href="/about"
          >
            {dictionary.page.home.knowMoreAboutMe} <ArrowRight size={16} />
          </Link>
        }
      />
      <div>
        <SubTitle title="Activities" seeMoreText="See more" />
        <section className="pt-[64px] flex flex-col gap-4 sm:pt-[32px]">
          {activities.map((activity: Activity) => (
            <Link key={activity.id} href="/">
              <Card className="px-6 py-[20px]">
                <h3 className="font-semibold text-base">{activity.name}</h3>
                <div className="flex gap-2 mt-1 items-center">
                  <span className="text-xs">{activity.date}</span>
                  <Badge className="bg-red-100 text-red-500">
                    {activity.type}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}