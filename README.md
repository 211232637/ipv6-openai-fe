# IPv6 Transition Automation

## Description
This web-based application automates the transition from IPv4 to IPv6 within dual-stack network environments. Leveraging generative AI and Ansible automation, it simplifies the complexities of IPv6 adoption by streamlining configuration processes.

## Features
- Automatic conversion of IPv4 configurations to IPv6
- User-defined parameters for IPv6 addressing schemes and prefixes
- Integrated CI/CD-like pipeline for automated deployment
- Playbook Repository for managing Ansible YAML playbooks
- Inventory Repository UI for managing Ansible YAML inventories

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/211232637/ipv6-openai-fe.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ipv6-openai-fe
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up the environment variables (see Configuration section).

## Usage
1. Start the application:
    ```bash
    npm start
    ```
2. Upload your IPv4 configurations through the web interface.
3. Define the parameters for the IPv6 conversion.
4. Generate and review the IPv6 configurations.
5. Deploy the configurations using the integrated pipeline.

## Configuration
Set the following environment variables in a `.env` file:
```env
APP_NAME=Net AI Copilot
APP_ENV=local
APP_KEY=base64:iu/y4jPcK5i5uTva5P0MZE5tUlqmWPtdU4gL19p9dWo=
APP_DEBUG=true
APP_URL=YOUR_URL
APP_LOGO_AUTH=https://upload.wikimedia.org/wikipedia/id/thumb/7/7a/UII_LOGO.svg/1200px-UII_LOGO.svg.png
```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact & Support
For support or to report issues, please contact [211232637@uii.ac.id](mailto:211232637@uii.ac.id).
