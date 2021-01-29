const m = require('mithril')
const Layout = require('./Layout')
module.exports = {
    view() {
        return <Layout>
            <div style="width:60%" class="mx-auto bg-white mb-4 mt-4 p-4 rounded-lg shadow">
                <div class="text-2xl">Terms of Service</div>
                <div class="">

                    Please read these terms of service ("terms of service", "terms") carefully before using shapeup-scheduler.searchspring.com
                    website (“website”, "service") operated by Searchspring ("us", 'we", "our").

                    <h2>Conditions of use</h2>
                    By using this website, you certify that you have read and reviewed this Agreement and that you
                    agree to comply with its terms. If you do not want to be bound by the terms of this Agreement,
                    you are advised to leave the website accordingly. Searchspring only grants use and access of this
                    website, its products, and its services to those who have accepted its terms.

                   <h2> Privacy policy</h2>
                    Before you continue using our website, we advise you to read our <a href="#!/privacy" class="mr-1 text-blue-700">privacy policy</a>
                    regarding our user data collection. It will help you better understand our practices.

                    <h2>Intellectual property</h2>
                    You agree that all materials, products, and services provided on this website are the property of
                    Searchspring, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all
                    copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree
                    that you will not reproduce or redistribute the Searchspring’s intellectual property in any way,
                    including electronic, digital, or new trademark registrations.

                    <h2>Indemnification</h2>
                    You agree to indemnify Searchspring and its affiliates and hold Searchspring harmless against legal claims
                    and demands that may arise from your use or misuse of our services. We reserve the right to
                    select our own legal counsel.

                    <h2>Limitation on liability</h2>
                    Searchspring is not liable for any damages that may occur to you as a result of your misuse of our
                    website.
                    Searchspring reserves the right to edit, modify, and change this Agreement any time. We shall let our
                    users know of these changes through electronic mail. This Agreement is an understanding
                    between Searchspring and the user, and this supersedes and replaces all prior agreements regarding
                    the use of this website.
                </div>
            </div>
        </Layout>
    }
}