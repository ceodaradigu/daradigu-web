import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import PromptForm from '@/components/PromptForm';
import ImageGenerator from '@/components/ImageGenerator';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <div id="generador" className="mt-16 space-y-16">
        <PromptForm />
        <ImageGenerator />
      </div>
    </Layout>
  );
}