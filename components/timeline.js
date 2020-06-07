import Link from 'next/link'
import { Timeline } from 'antd';
import parse from '../lib/dateutil'

export default function TimelimeLabelDemo({ blogs }) {

    return (
        <>
            <Timeline mode="left">
                {
                    blogs.map(({ id, date, title }) => {
                        return <Timeline.Item label={parse(date)} key={id.join('.')}>
                            <Link href={`/posts/${id.join('/')}`} as={`/posts/${id.join('/')}`}>
                                <a>{title}</a>
                            </Link>
                        </Timeline.Item>
                    })
                }
            </Timeline>
        </>
    );
}