import React, { useState } from 'react';
import { AlertCircle, ChevronRight, Image as ImageIcon, Globe } from 'lucide-react';

const DigitisationStationDashboard = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Language options for the community
  const languages = [
    { code: 'zh-Hans', name: 'Chinese (Simplified)', native: '简体中文' },
    { code: 'zh-Hant', name: 'Chinese (Traditional)', native: '繁體中文' },
    { code: 'ar', name: 'Arabic', native: 'العربية' },
    { code: 'el', name: 'Greek', native: 'Ελληνικά' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
    { code: 'fil', name: 'Filipino', native: 'Filipino' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली' },
    { code: 'it', name: 'Italian', native: 'Italiano' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'pt', name: 'Portuguese', native: 'Português' }
  ];

  // Translation function using Anthropic API
  const translateContent = async (targetLang) => {
    setTranslating(true);
    setTranslatedContent(null);

    try {
      const contentToTranslate = getSectionContent(activeSection);
      const languageName = languages.find(l => l.code === targetLang)?.name || targetLang;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: `Translate the following digitisation station guide into ${languageName}. Maintain all formatting, step numbers, and warning callouts. Keep technical terms like "VHS", "USB", "MP4", "MP3" unchanged. Make sure the translation is clear and natural for someone using the equipment for the first time.\n\n${contentToTranslate}`
            }
          ]
        })
      });

      const data = await response.json();
      const translated = data.content.find(item => item.type === 'text')?.text || '';
      setTranslatedContent(translated);
    } catch (error) {
      setTranslatedContent('Translation error. Please try again or ask staff for assistance.');
      console.error('Translation error:', error);
    } finally {
      setTranslating(false);
    }
  };

  // Helper function to get section content as plain text
  const getSectionContent = (section) => {
    // Returns the text content of the current section for translation
    const sectionTexts = {
      welcome: `Welcome to the Digitisation Station
Hurstville Branch – Georges River Libraries

What is this station?
This station helps you convert your old physical media into digital files that you can keep, share, and enjoy on modern devices.

What can you digitise here?
- VHS tapes → MP4 video files
- Audio cassettes and CDs → MP3 audio files

Do I need technical experience?
No! These guides are written for first-time users. Just follow the steps carefully.

Before you start:
- Book your session at the front desk
- You must own the media or have permission to copy it (Australian Copyright Council: copyright.org.au)
- The library is not responsible for any damage to your personal media
- Ask staff if you need help getting started

Need help?
Library staff can show you how to get started. Just ask at the front desk.`,

      vhsGuide: `VHS Digitisation Guide

Equipment:
- Blackmagic ATEM Mini Pro ISO (video switch with recording keypad)
- LG DVD/VHS Combo Player (Model 3850R-Z243R)
- Monitor
- USB drive (bring your own or use ours if available)

Output: MP4 video file saved to your USB drive

Step-by-Step Instructions:

Step 1: Power and Screen
Make sure the station is plugged in. Press the CHROME button on the underside of the monitor (right-hand side) if the screen is not on. The screen should show the HDMI input.

Step 2: Connect Your USB Drive
Plug your USB drive into the USB-C port on the back of the keypad. Look for the bright tape label marking the port.
The DISK light on the keypad will turn green when your USB is connected correctly.

Step 3: Insert Your VHS Tape
Insert your VHS tape into the VHS slot on the LG combo player.

Step 4: Check Video Preview
You should see your video on the PREVIEW, PROGRAM, and CAMERA 1 screens. The Channel 1 button will light up red.

Step 5: Turn On Sound
Press the ON button under Channel 1 on the keypad to turn on sound.
You should hear sound from the video and see the sound bar moving on the screen.

⚠️ WARNING: Keep sound ON for the entire recording or your video will have no audio!

Step 6: Rewind to Start
Use the rewind button on the VHS player to go back to the beginning of your tape.

Step 7: Start Recording
Press the REC button on the keypad.
The DISK light will turn red, showing you are recording.

Step 8: Play Your VHS
Press PLAY on the VHS player.
Your video will record in real time. Do not fast forward.

Step 9: Stop Recording
When your video is finished, press REC again to stop recording.
Your MP4 file is now saved to your USB drive.

⚠️ IMPORTANT: Recording happens in real time. A 60-minute tape takes 60 minutes to record.

Supported Formats:
- VHS (standard full-size cassettes)
- DVD (if you have one to digitise)`,

      audioGuide: `Audio Digitisation Guide

Equipment:
- Tascam CD-A580 (audio recorder/player)
- USB drive (bring your own or use ours if available)

Output: MP3 audio file saved to your USB drive

Step-by-Step Instructions:

Step 1: Connect Your USB Drive
Insert your USB drive into the USB port on the front of the Tascam CD-A580.

Step 2: Insert Your Media
- For cassette tapes: Open the cassette door and insert your tape
- For CDs: Open the CD tray and place your CD on the tray

Step 3: Select Your Source
Press the INPUT button to select either CD or TAPE as your source.

Step 4: Rewind to Start (Cassette Only)
If using a cassette, rewind to the beginning of the tape using the rewind button.

Step 5: Start Recording
Press the RECORD button on the Tascam.
The display will show "REC" when recording has started.

Step 6: Play Your Audio
Press PLAY.
Your audio will record in real time.

Step 7: Stop Recording
When your audio is finished, press STOP.
Your MP3 file is now saved to your USB drive.

⚠️ IMPORTANT: Recording happens in real time. A 60-minute tape takes 60 minutes to record.

Supported Formats:
- Audio cassette tapes
- CDs`,

      workflow1: `I Want to Save a VHS Tape

Goal: Convert a VHS tape to a digital MP4 file

You'll need:
- Your VHS tape
- A USB drive to save the file

Follow these steps:
1. Go to the Equipment Guides section
2. Select "VHS Digitisation Guide"
3. Follow all steps carefully
4. Your MP4 file will be saved to your USB drive

Time needed: Same length as your tape (a 60-minute tape takes 60 minutes)

Equipment you'll use:
- Blackmagic ATEM Mini Pro ISO
- LG DVD/VHS Combo Player`,

      workflow2: `I Want to Record Audio

Goal: Convert audio cassettes or CDs to digital MP3 files

You'll need:
- Your cassette tape or CD
- A USB drive to save the file

Follow these steps:
1. Go to the Equipment Guides section
2. Select "Audio Digitisation Guide"
3. Follow all steps carefully
4. Your MP3 file will be saved to your USB drive

Time needed: Same length as your recording (a 60-minute tape takes 60 minutes)

Equipment you'll use:
- Tascam CD-A580`
    };

    return sectionTexts[section] || '';
  };

  const WarningBox = ({ children }) => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 flex items-start gap-3">
      <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
      <div className="text-sm text-yellow-800">{children}</div>
    </div>
  );

  const ImageModal = ({ src, alt, onClose }) => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-6xl max-h-full">
        <img 
          src={src} 
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain"
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-100"
        >
          ✕
        </button>
      </div>
    </div>
  );

  const TappableImage = ({ src, alt, caption }) => (
    <div className="my-6 border rounded-lg overflow-hidden bg-gray-50">
      <div 
        className="relative cursor-pointer group"
        onClick={() => setEnlargedImage({ src, alt })}
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
          <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
        </div>
      </div>
      {caption && (
        <div className="p-3 text-sm text-gray-600 bg-white border-t">
          {caption}
        </div>
      )}
    </div>
  );

  const TranslationPanel = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Globe size={20} className="text-blue-600" />
        <h3 className="font-semibold text-blue-900">Translate This Guide</h3>
      </div>
      
      <div className="flex gap-2 mb-3 flex-wrap">
        <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border border-blue-300 rounded bg-white text-sm"
        >
          <option value="">Select your language...</option>
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.native} ({lang.name})
            </option>
          ))}
        </select>
        
        <button
          onClick={() => selectedLanguage && translateContent(selectedLanguage)}
          disabled={!selectedLanguage || translating}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
        >
          {translating ? 'Translating...' : 'Translate'}
        </button>
      </div>

      {translatedContent && (
        <div className="bg-white p-4 rounded border border-blue-200 mt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-900">Translation:</span>
            <button 
              onClick={() => setTranslatedContent(null)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Hide
            </button>
          </div>
          <div className="text-sm text-gray-800 whitespace-pre-wrap" dir="auto">
            {translatedContent}
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'welcome':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the Digitisation Station</h1>
            <p className="text-lg text-gray-600 mb-6">Hurstville Branch – Georges River Libraries</p>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What is this station?</h2>
              <p className="text-gray-700 mb-4">
                This station helps you convert your old physical media into digital files that you can keep, 
                share, and enjoy on modern devices.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">What can you digitise here?</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li><strong>VHS tapes</strong> → MP4 video files</li>
                <li><strong>Audio cassettes and CDs</strong> → MP3 audio files</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Do I need technical experience?</h2>
              <p className="text-gray-700 mb-6">
                <strong>No!</strong> These guides are written for first-time users. Just follow the steps carefully.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Before you start:</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Book your session at the front desk</li>
                <li>You must own the media or have permission to copy it (<a href="https://www.copyright.org.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Australian Copyright Council</a>)</li>
                <li>The library is not responsible for any damage to your personal media</li>
                <li>Ask staff if you need help getting started</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                <h3 className="font-bold text-green-900 mb-2">Need help?</h3>
                <p className="text-green-800">
                  Library staff can show you how to get started. Just ask at the front desk.
                </p>
              </div>

              <TappableImage 
                src="assets/station-overview.jpg"
                alt="Digitisation Station overview showing all equipment"
                caption="Tap to enlarge: Full view of the Digitisation Station setup"
              />
            </div>
          </div>
        );

      case 'vhsGuide':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">VHS Digitisation Guide</h1>
            
            <TranslationPanel />

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Equipment:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Blackmagic ATEM Mini Pro ISO (video switch with recording keypad)</li>
                <li>LG DVD/VHS Combo Player (Model 3850R-Z243R)</li>
                <li>Monitor</li>
                <li>USB drive (bring your own or use ours if available)</li>
              </ul>
              <p className="mt-3 text-sm font-medium text-gray-900">
                <strong>Output:</strong> MP4 video file saved to your USB drive
              </p>
            </div>

            <TappableImage 
              src="assets/keypad-closeup.jpg"
              alt="Close-up of the Blackmagic ATEM Mini Pro ISO keypad showing USB port, DISK light, REC button, and channel controls"
              caption="Tap to enlarge: Keypad controls and USB connection point"
            />

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 1: Power and Screen</h3>
                <p className="text-gray-700">
                  Make sure the station is plugged in. Press the <strong>CHROME</strong> button on the 
                  <strong> underside of the monitor (right-hand side)</strong> if the screen is not on. 
                  The screen should show the HDMI input.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 2: Connect Your USB Drive</h3>
                <p className="text-gray-700 mb-2">
                  Plug your USB drive into the <strong>USB-C port on the back of the keypad</strong>. 
                  Look for the <strong>bright tape label</strong> marking the port.
                </p>
                <p className="text-gray-700">
                  The <strong>DISK</strong> light on the keypad will turn <strong className="text-green-600">green</strong> when 
                  your USB is connected correctly.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 3: Insert Your VHS Tape</h3>
                <p className="text-gray-700">
                  Insert your VHS tape into the VHS slot on the LG combo player.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 4: Check Video Preview</h3>
                <p className="text-gray-700">
                  You should see your video on the <strong>PREVIEW</strong>, <strong>PROGRAM</strong>, 
                  and <strong>CAMERA 1</strong> screens. The Channel 1 button will light up red.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 5: Turn On Sound</h3>
                <p className="text-gray-700">
                  Press the <strong>ON</strong> button under <strong>Channel 1</strong> on the keypad 
                  to turn on sound. You should hear sound from the video and see the sound bar moving on the screen.
                </p>
              </div>

              <WarningBox>
                <strong>Keep sound ON for the entire recording</strong> or your video will have no audio! 
                Make sure the sound bar is moving throughout your recording.
              </WarningBox>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 6: Rewind to Start</h3>
                <p className="text-gray-700">
                  Use the rewind button on the VHS player to go back to the beginning of your tape.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 7: Start Recording</h3>
                <p className="text-gray-700 mb-2">
                  Press the <strong>REC</strong> button on the keypad.
                </p>
                <p className="text-gray-700">
                  The <strong>DISK</strong> light will turn <strong className="text-red-600">red</strong>, 
                  showing you are recording.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 8: Play Your VHS</h3>
                <p className="text-gray-700 mb-2">
                  Press <strong>PLAY</strong> on the VHS player.
                </p>
                <p className="text-gray-700">
                  Your video will record in real time. <strong>Do not fast forward.</strong>
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 9: Stop Recording</h3>
                <p className="text-gray-700 mb-2">
                  When your video is finished, press <strong>REC</strong> again to stop recording.
                </p>
                <p className="text-gray-700">
                  Your MP4 file is now saved to your USB drive.
                </p>
              </div>

              <WarningBox>
                <strong>Recording happens in real time.</strong> A 60-minute tape takes 60 minutes to record. 
                Do not leave the station unattended during recording.
              </WarningBox>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Supported Formats:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>VHS (standard full-size cassettes)</li>
                  <li>DVD (if you have one to digitise)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'audioGuide':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Audio Digitisation Guide</h1>
            
            <TranslationPanel />

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Equipment:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tascam CD-A580 (audio recorder/player)</li>
                <li>USB drive (bring your own or use ours if available)</li>
              </ul>
              <p className="mt-3 text-sm font-medium text-gray-900">
                <strong>Output:</strong> MP3 audio file saved to your USB drive
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 1: Connect Your USB Drive</h3>
                <p className="text-gray-700">
                  Insert your USB drive into the USB port on the front of the Tascam CD-A580.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 2: Insert Your Media</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>For cassette tapes:</strong> Open the cassette door and insert your tape</li>
                  <li><strong>For CDs:</strong> Open the CD tray and place your CD on the tray</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 3: Select Your Source</h3>
                <p className="text-gray-700">
                  Press the <strong>INPUT</strong> button to select either <strong>CD</strong> or <strong>TAPE</strong> as your source.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 4: Rewind to Start (Cassette Only)</h3>
                <p className="text-gray-700">
                  If using a cassette, rewind to the beginning of the tape using the rewind button.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 5: Start Recording</h3>
                <p className="text-gray-700 mb-2">
                  Press the <strong>RECORD</strong> button on the Tascam.
                </p>
                <p className="text-gray-700">
                  The display will show "REC" when recording has started.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 6: Play Your Audio</h3>
                <p className="text-gray-700 mb-2">
                  Press <strong>PLAY</strong>.
                </p>
                <p className="text-gray-700">
                  Your audio will record in real time.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 7: Stop Recording</h3>
                <p className="text-gray-700 mb-2">
                  When your audio is finished, press <strong>STOP</strong>.
                </p>
                <p className="text-gray-700">
                  Your MP3 file is now saved to your USB drive.
                </p>
              </div>

              <WarningBox>
                <strong>Recording happens in real time.</strong> A 60-minute tape takes 60 minutes to record. 
                Do not leave the station unattended during recording.
              </WarningBox>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Supported Formats:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Audio cassette tapes</li>
                  <li>CDs</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'workflow1':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">I Want to Save a VHS Tape</h1>
            
            <TranslationPanel />

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-lg text-blue-900 mb-2">Goal:</h3>
              <p className="text-blue-800 text-lg">Convert a VHS tape to a digital MP4 file</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">You'll need:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Your VHS tape</li>
                  <li>A USB drive to save the file</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Follow these steps:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Go to the <strong>Equipment Guides</strong> section</li>
                  <li>Select <strong>"VHS Digitisation Guide"</strong></li>
                  <li>Follow all steps carefully</li>
                  <li>Your MP4 file will be saved to your USB drive</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Time needed:</h3>
                <p className="text-gray-700">
                  Same length as your tape (a 60-minute tape takes 60 minutes)
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Equipment you'll use:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Blackmagic ATEM Mini Pro ISO</li>
                  <li>LG DVD/VHS Combo Player</li>
                </ul>
              </div>

              <button
                onClick={() => setActiveSection('vhsGuide')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium"
              >
                Go to VHS Guide
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case 'workflow2':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">I Want to Record Audio</h1>
            
            <TranslationPanel />

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-lg text-green-900 mb-2">Goal:</h3>
              <p className="text-green-800 text-lg">Convert audio cassettes or CDs to digital MP3 files</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">You'll need:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Your cassette tape or CD</li>
                  <li>A USB drive to save the file</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Follow these steps:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Go to the <strong>Equipment Guides</strong> section</li>
                  <li>Select <strong>"Audio Digitisation Guide"</strong></li>
                  <li>Follow all steps carefully</li>
                  <li>Your MP3 file will be saved to your USB drive</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Time needed:</h3>
                <p className="text-gray-700">
                  Same length as your recording (a 60-minute tape takes 60 minutes)
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Equipment you'll use:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Tascam CD-A580</li>
                </ul>
              </div>

              <button
                onClick={() => setActiveSection('audioGuide')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
              >
                Go to Audio Guide
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Digitisation Station</h1>
          <p className="text-sm text-gray-600">Georges River Libraries – Hurstville Branch</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 py-2 overflow-x-auto">
            <button
              onClick={() => setActiveSection('welcome')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === 'welcome' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Welcome
            </button>
            
            <div className="border-l border-gray-300 mx-2"></div>
            
            <button
              onClick={() => setActiveSection('vhsGuide')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === 'vhsGuide' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              VHS Guide
            </button>
            
            <button
              onClick={() => setActiveSection('audioGuide')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === 'audioGuide' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Audio Guide
            </button>
            
            <div className="border-l border-gray-300 mx-2"></div>
            
            <button
              onClick={() => setActiveSection('workflow1')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === 'workflow1' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Save VHS
            </button>
            
            <button
              onClick={() => setActiveSection('workflow2')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === 'workflow2' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Record Audio
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Georges River Libraries – Hurstville Branch</p>
          <p className="mt-1">Need help? Ask staff at the front desk</p>
        </div>
      </footer>

      {/* Image Modal */}
      {enlargedImage && (
        <ImageModal 
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </div>
  );
};

export default DigitisationStationDashboard;
