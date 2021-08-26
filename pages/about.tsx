import Layout from '../components/layout';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function About() {
  return (
    <Layout>
      <Card>
        <Typography variant="h5" component="h2">
          Passionate Software Developer
        </Typography>
        <CardContent>
          <Typography variant="body2" component="p">
            Software Developer At Athenahealth
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
}
