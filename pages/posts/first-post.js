import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../components/layout'

export default function FirstPost() {
  return(
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy='lazyOnload'
          onLoad={() => {
            console.log("script loaded correctly")
        }}/>
      <h1>First Post</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique odio non leo blandit tristique. Fusce volutpat sem sit amet leo lacinia placerat ut et urna. Nunc massa nisi, dapibus vel vestibulum ut, egestas nec nisl. Proin mattis nisl vel elit interdum, nec laoreet sapien consequat. Nam efficitur in leo at tincidunt. In malesuada lectus eu justo blandit, vitae sodales nulla auctor. Fusce pulvinar diam ac nisi faucibus pellentesque. Mauris id lectus vel sem maximus molestie. Aliquam non tincidunt tellus, quis finibus ante. Nunc efficitur orci sem, sed porttitor diam semper a. In dolor velit, pulvinar sed lacus quis, malesuada ullamcorper felis. Curabitur cursus lorem vel lacus viverra, in interdum purus commodo.
      </p>

      <p>
        Suspendisse eget felis felis. In sed scelerisque justo. Quisque blandit eu risus at consectetur. Sed tempus velit felis, vel volutpat est fringilla nec. Donec sit amet enim massa. Aenean hendrerit maximus turpis, id ultricies dolor efficitur vel. Sed non tortor risus. Mauris vel efficitur velit. In hac habitasse platea dictumst. Aenean non orci dui. Pellentesque eget scelerisque erat. Vestibulum aliquet blandit justo, at venenatis risus aliquet maximus. Quisque placerat imperdiet sem, in volutpat enim egestas id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat fermentum nulla. In eu diam at ipsum fermentum mattis.
      </p>
      
      <p>
        Suspendisse ut nunc est. Maecenas iaculis mi efficitur, auctor ipsum et, eleifend ipsum. Phasellus at rhoncus nisl. Sed cursus, diam et ultricies ultricies, urna dui fermentum tellus, ut imperdiet nisl ante a ex. Nullam tincidunt nunc sit amet condimentum ultricies. Vivamus odio arcu, venenatis vitae quam vel, tincidunt vestibulum odio. Phasellus id mattis odio. Nulla tincidunt varius nisl, sed sodales nulla malesuada nec. Curabitur dignissim metus a dictum vulputate. Suspendisse ultrices quam eget malesuada hendrerit. Praesent vitae auctor est, rutrum viverra mi. Duis ligula urna, aliquam porta velit in, mattis eleifend risus. Sed vulputate odio ut auctor congue. Nulla aliquet, tellus vel bibendum pellentesque, est lectus tempus ex, sit amet porttitor odio libero vitae quam. Quisque sapien metus, tempus et tincidunt vitae, imperdiet sit amet nulla.
      </p>
      <p>
        Donec sit amet mi consequat, pulvinar enim ut, imperdiet sem. Donec in semper nulla. Mauris nec orci at mi commodo aliquam ut vel erat. Vivamus augue turpis, rutrum eget turpis in, egestas aliquet nisl. Sed non est iaculis, auctor ipsum vitae, fringilla neque. Vivamus sit amet massa sit amet quam suscipit sodales ut quis augue. Maecenas dapibus ex non tempor dapibus. Integer laoreet nulla ac ligula elementum, eget fringilla nisl iaculis. Curabitur dui augue, finibus eu egestas et, tempor sed leo. Ut sodales ornare nulla et pellentesque.
      </p>
      <p>
        Vivamus vitae metus nec nibh semper tempus. Sed a suscipit lectus. Ut fermentum felis vitae vestibulum vehicula. Nulla quam tellus, ullamcorper sed dolor a, ullamcorper porta ipsum. Suspendisse et dui a dolor consequat rhoncus. Vivamus rutrum, nunc at bibendum bibendum, odio lectus maximus dolor, nec luctus lectus diam vitae magna. Maecenas lobortis sodales neque. Nulla at dolor sed massa faucibus eleifend ut sed dolor. Nunc tortor velit, volutpat sed maximus in, dictum at augue. Proin nisi ex, dapibus at enim eu, dictum sagittis ex.
      </p>
    </Layout>
  )
}


