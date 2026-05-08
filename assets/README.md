# Assets Folder

This folder contains all images and media files used in the Digitisation Station Dashboard.

## Required Images

The dashboard requires two key photos of your actual station setup:

### 1. station-overview.jpg
**Full station overview photo**

**Requirements**:
- Shows the complete digitisation station setup
- All equipment visible: Blackmagic ATEM Mini Pro ISO, LG player, Tascam, monitor
- Clear, well-lit photograph
- Recommended resolution: 1920x1080 pixels (or higher)
- File size: Optimize to <500KB for fast loading

**Tips for taking this photo**:
- Stand back to capture entire station
- Ensure all equipment is powered on and visible
- Good lighting (avoid glare on screens)
- Clear the area of any clutter
- Take from patron's perspective (where they'll stand)

### 2. keypad-closeup.jpg
**Close-up of Blackmagic ATEM Mini Pro ISO keypad**

**Requirements**:
- Clear view of the keypad controls
- Visible elements:
  - USB-C port on the back (with bright tape marking)
  - DISK light (green/red indicator)
  - REC button
  - Channel buttons (1-4)
  - ON/OFF buttons for channels
  - Program button
- Recommended resolution: 1920x1080 pixels (or higher)
- File size: Optimize to <500KB

**Tips for taking this photo**:
- Get close enough to see all button labels
- Ensure tape marking on USB port is visible
- Take from angle patron will view it from
- Good focus on text/labels
- Consider adding annotations pointing to key elements

## Photo Annotations

Consider adding simple text annotations to the keypad close-up:
- Arrow pointing to USB port: "USB drive goes here"
- Arrow pointing to DISK light: "Green = ready, Red = recording"
- Arrow pointing to REC button: "Press to start/stop"

You can add these annotations using:
- Preview (macOS)
- Paint (Windows)
- GIMP (free, cross-platform)
- Photoshop or similar tools

## Image Optimization

Before adding images to the repository:

1. **Resize if needed**:
   ```bash
   # Using ImageMagick
   convert original.jpg -resize 1920x1080 station-overview.jpg
   ```

2. **Optimize file size**:
   - Use ImageOptim (macOS)
   - Use TinyPNG (web)
   - Use JPEG compression (quality 80-90)

3. **Test loading speed**:
   - Images should load quickly on mobile
   - Target <500KB per image

## Current Assets

- [ ] `station-overview.jpg` - **TO BE ADDED**
- [ ] `keypad-closeup.jpg` - **TO BE ADDED**

## Updating Photos

When equipment changes or moves:

1. Take new photos following the guidelines above
2. Replace old images in this folder
3. Rebuild the dashboard: `npm run build`
4. Redeploy to production
5. Complete the verification checklist in `docs/VERIFICATION_CHECKLIST.md`

## Using Placeholder Images

If you need to deploy before photos are available, you can use placeholder images temporarily:

```bash
# Create placeholder images (requires ImageMagick)
convert -size 1920x1080 xc:lightgray -pointsize 72 -draw "text 600,540 'Station Photo'" station-overview.jpg
convert -size 1920x1080 xc:lightgray -pointsize 72 -draw "text 600,540 'Keypad Photo'" keypad-closeup.jpg
```

**Important**: Replace placeholders with real photos before opening to patrons!

## Copyright and Usage

- Photos should be taken by library staff
- Ensure no patrons or staff faces are visible (unless consent obtained)
- Photos are for internal library use only
- Update this README if you add additional images

---

**Last Updated**: May 2026  
**Maintained By**: Georges River Libraries
